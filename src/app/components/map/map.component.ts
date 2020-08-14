import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Circle, circle, CircleMarkerOptions, latLng, LayerGroup, layerGroup,
  MapOptions, Polyline, polyline, PolylineOptions, tileLayer
} from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { Subscription } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { IPerson } from '../../interfaces/iperson';
import { Gender } from '../../enums/gender.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private static readonly BASE_LAYER_OPTIONS = { maxZoom: 19, attribution: '...' };
  private static readonly FEMALE_PERSON_LAYER_OPTIONS: CircleMarkerOptions = { radius: 5, weight: 0, fillColor: 'pink', fillOpacity: 0.6 };
  private static readonly MALE_PERSON_LAYER_OPTIONS: CircleMarkerOptions = { radius: 5, weight: 0, fillColor: 'blue', fillOpacity: 0.6 };
  private static readonly OTHER_PERSON_LAYER_OPTIONS: CircleMarkerOptions = { radius: 5, weight: 0, fillColor: 'green', fillOpacity: 0.6 };
  private static readonly TRAILS_LAYER_OPTIONS: PolylineOptions = { weight: 1, color: 'red', opacity: 0.3 };

  private readonly peopleIdLookUp: { [personId: number]: number };
  private readonly peopleLayer: LayerGroup;
  private readonly trailsIdLookUp: { [personId: number]: number };
  private readonly trailsLayer: LayerGroup;

  private peopleSubscription: Subscription;

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor(private peopleService: PeopleService) {
    this.peopleIdLookUp = {};
    this.peopleLayer = layerGroup();
    this.trailsIdLookUp = {};
    this.trailsLayer = layerGroup();
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', MapComponent.BASE_LAYER_OPTIONS),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', MapComponent.BASE_LAYER_OPTIONS)
      },
      overlays: {
        People: this.peopleLayer,
        Trails: this.trailsLayer
      }
    };
    this.options = {
      layers: [
        this.layersControl.baseLayers['Open Street Map'],
        this.layersControl.overlays.People
      ],
      zoom: 17,
      center: PeopleService.START_LOCATION
    };
  }

  private static getPopupContent(person: IPerson): string {
    let genderText: string;
    switch (person.gender) {
      case Gender.FEMALE:
        genderText = 'female';
        break;
      case Gender.MALE:
        genderText = 'male';
        break;
      default:
        genderText = 'others';
        break;
    }
    return `<div><b>Id</b> ${person.id}</div>
    <div><b>Gender</b> ${genderText}</div>
    <div><b>Length</b> ${person.trail.length}</div>
    <div><b>ETA</b> ${new Date(person.eta).toLocaleTimeString()}</div>`;
  }

  public ngOnDestroy(): void {
    this.peopleSubscription.unsubscribe();
    this.peopleSubscription = null;
  }

  public ngOnInit(): void {
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.updatePeople(people));
  }

  private addPerson(person: IPerson): void {
    let options: CircleMarkerOptions;
    switch (person.gender) {
      case Gender.FEMALE:
        options = MapComponent.FEMALE_PERSON_LAYER_OPTIONS;
        break;
      case Gender.MALE:
        options = MapComponent.MALE_PERSON_LAYER_OPTIONS;
        break;
      default:
        options = MapComponent.OTHER_PERSON_LAYER_OPTIONS;
        break;
    }
    const dot = circle(latLng(person.trail[0]), options);
    dot.bindPopup(MapComponent.getPopupContent(person));
    this.peopleLayer.addLayer(dot);
    this.peopleIdLookUp[person.id] = this.peopleLayer.getLayerId(dot);
    const line = polyline(person.trail, MapComponent.TRAILS_LAYER_OPTIONS);
    this.trailsLayer.addLayer(line);
    this.trailsIdLookUp[person.id] = this.trailsLayer.getLayerId(line);
  }

  private removePerson(personId: number): void {
    let layer = this.peopleLayer.getLayer(this.peopleIdLookUp[personId]);
    this.peopleLayer.removeLayer(layer);
    layer.remove();
    delete this.peopleIdLookUp[personId];
    layer = this.trailsLayer.getLayer(this.trailsIdLookUp[personId]);
    this.trailsLayer.removeLayer(layer);
    layer.remove();
    delete this.trailsIdLookUp[personId];
  }

  private updatePeople(people: Array<IPerson>): void {
    people.forEach(person => {
      const personLayerId = this.peopleIdLookUp[person.id];
      if (personLayerId === undefined) {
        this.addPerson(person);
      } else {
        this.updatePerson(personLayerId, person);
      }
    });
    Object.keys(this.peopleIdLookUp).map(key => parseInt(key, null)).forEach(personId => {
      if (people.findIndex((person) => person.id === personId) === -1) {
        this.removePerson(personId);
      }
    });
  }

  private updatePerson(personLayerId: number, person: IPerson): void {
    const dot = this.peopleLayer.getLayer(personLayerId) as Circle;
    dot.setLatLng(latLng(person.trail[0]));
    dot.setPopupContent(MapComponent.getPopupContent(person));
    const line = this.trailsLayer.getLayer(this.trailsIdLookUp[person.id]) as Polyline;
    line.setLatLngs(person.trail.map(location => latLng(location)));
  }
}
