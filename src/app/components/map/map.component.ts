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

  private readonly peopleLookUp: Map<number, Circle>;
  private readonly peopleLayer: LayerGroup;
  private readonly trailsLookUp: Map<number, Polyline>;
  private readonly trailsLayer: LayerGroup;

  private peopleSubscription: Subscription;

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor(private peopleService: PeopleService) {
    this.peopleLookUp = new Map<number, Circle>();
    this.peopleLayer = layerGroup();
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', environment.map.baseLayers),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', environment.map.baseLayers)
      },
      overlays: {
        People: this.peopleLayer
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
    if (!environment.map.trailsEnabled) {
      return;
    }
    this.trailsLookUp = new Map<number, Polyline>();
    this.trailsLayer = layerGroup();
    this.layersControl.overlays.Trails = this.trailsLayer;
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
    this.peopleLookUp.set(person.id, dot);
    if (!environment.map.trailsEnabled) {
      return;
    }
    const line = polyline([location, location.clone()], environment.map.trailsLayer);
    this.trailsLayer.addLayer(line);
    this.trailsLookUp.set(person.id, line);
  }

  private removePerson(personId: number, dot: Circle): void {
    dot.closePopup();
    dot.unbindPopup();
    this.peopleLayer.removeLayer(dot);
    dot.remove();
    this.peopleLookUp.delete(personId);
    if (!environment.map.trailsEnabled) {
      return;
    }
    const line = this.trailsLookUp.get(personId);
    this.trailsLayer.removeLayer(line);
    line.remove();
    this.trailsLookUp.delete(personId);
  }

  private updatePeople(people: Map<number, IPerson>): void {
    people.forEach(person => {
      const dot = this.peopleLookUp.get(person.id);
      if (dot === undefined) {
        this.addPerson(person);
      } else {
        this.updatePerson(person, dot);
      }
    });
    this.peopleLookUp.forEach((dot, personId) => {
      if (!people.has(personId)) {
        this.removePerson(personId, dot);
      }
    });
  }

  private updatePerson(person: IPerson, dot: Circle): void {
    const location = latLng(person.location);
    dot.setLatLng(location);
    if (!environment.map.trailsEnabled) {
      return;
    }
    const line = this.trailsLookUp.get(person.id);
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
