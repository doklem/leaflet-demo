import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Circle, circle, CircleMarkerOptions, latLng, LayerGroup, layerGroup,
  MapOptions, Polyline, polyline, tileLayer, LatLng
} from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleService } from '../../services/people.service';
import { IPerson } from '../../interfaces/iperson';
import { Gender } from '../../enums/gender.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private readonly peopleLookUp: { [personId: number]: Circle };
  private readonly peopleLayer: LayerGroup;
  private readonly trailsLookUp: { [personId: number]: Polyline };
  private readonly trailsLayer: LayerGroup;

  private peopleSubscription: Subscription;

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor(private peopleService: PeopleService) {
    this.peopleLookUp = {};
    this.peopleLayer = layerGroup();
    this.trailsLookUp = {};
    this.trailsLayer = layerGroup();
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', environment.map.baseLayers),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', environment.map.baseLayers)
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
      zoom: environment.map.initialZoom,
      center: environment.map.startLocation
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
        options = environment.map.femalePersonLayer;
        break;
      case Gender.MALE:
        options = environment.map.malePersonLayer;
        break;
      default:
        options = environment.map.otherPersonLayer;
        break;
    }
    const location = latLng(person.location);
    const dot = circle(location, options);
    dot.bindPopup(MapComponent.getPopupContent(person));
    this.peopleLayer.addLayer(dot);
    this.peopleLookUp[person.id] = dot;
    const line = polyline([location, location.clone()], environment.map.trailsLayer);
    this.trailsLayer.addLayer(line);
    this.trailsLookUp[person.id] = line;
  }

  private removePerson(personId: number): void {
    const dot = this.peopleLookUp[personId];
    dot.closePopup();
    dot.unbindPopup();
    this.peopleLayer.removeLayer(dot);
    dot.remove();
    delete this.peopleLookUp[personId];
    const line = this.trailsLookUp[personId];
    this.trailsLayer.removeLayer(line);
    line.remove();
    delete this.trailsLookUp[personId];
  }

  private updatePeople(people: Array<IPerson>): void {
    people.forEach(person => {
      const dot = this.peopleLookUp[person.id];
      if (dot === undefined) {
        this.addPerson(person);
      } else {
        this.updatePerson(person);
      }
    });
    Object.keys(this.peopleLookUp).map(key => parseInt(key, null)).forEach(personId => {
      if (people.findIndex((person) => person.id === personId) === -1) {
        this.removePerson(personId);
      }
    });
  }

  private updatePerson(person: IPerson): void {
    const location = latLng(person.location);
    const dot = this.peopleLookUp[person.id];
    dot.setLatLng(location);
    const line = this.trailsLookUp[person.id];
    const latLngs = line.getLatLngs() as LatLng[];
    if ((latLngs[latLngs.length - 2]).distanceTo(location) > environment.map.trailPointMinDistance) {
      line.addLatLng(location);
    } else {
      const lineEnd = latLngs[latLngs.length - 1];
      lineEnd.lat = location.lat;
      lineEnd.lng = location.lng;
    }
  }
}
