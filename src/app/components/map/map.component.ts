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
import { PersonState } from '../../enums/person-state.enum';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private static readonly MEASURE_ADD_PERSON = 'Add person';
  private static readonly MEASURE_MODIFY_PERSON = 'Modify person';
  private static readonly MEASURE_REMOVE_PERSON = 'Remove person';
  private static readonly MEASURE_UPDATE_PEOPLE = 'Update people';

  private readonly peopleLookUp: Map<number, Circle>;
  private readonly peopleLayer: LayerGroup;
  private readonly trailsLookUp: Map<number, Polyline>;
  private readonly trailsLayer: LayerGroup;

  private isActice: boolean;
  private peopleBuffer: Array<IPerson>;
  private peopleSubscription: Subscription;

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor(private peopleService: PeopleService) {
    this.isActice = false;
    this.peopleBuffer = null;
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
    this.isActice = false;
    this.peopleSubscription.unsubscribe();
    this.peopleSubscription = null;
    this.peopleBuffer = null;
  }

  public ngOnInit(): void {
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);
    this.isActice = true;
    if (environment.production) {
      requestAnimationFrame(() => this.updatePeople());
    } else {
      requestAnimationFrame(() => this.updatePeopleWithMeasuring());
    }
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
    const dot = circle(person.location, options);
    dot.bindPopup(MapComponent.getPopupContent(person));
    this.peopleLayer.addLayer(dot);
    this.peopleLookUp.set(person.id, dot);
  }

  private addTrail(person: IPerson): void {
    const locationLatLng = latLng(person.location);
    const line = polyline([locationLatLng.clone(), locationLatLng.clone()], environment.map.trailsLayer);
    this.trailsLayer.addLayer(line);
    this.trailsLookUp.set(person.id, line);
  }

  private modifyPerson(person: IPerson): void {
    const dot = this.peopleLookUp.get(person.id);
    // Check if the creation of the person was not missed because of late join.
    if (dot === undefined) {
      this.addPerson(person);
      return;
    }
    dot.setLatLng(person.location);
  }

  private modifyTrail(person: IPerson): void {
    const line = this.trailsLookUp.get(person.id);
    // Check if the creation of the person was not missed because of late join.
    if (line === undefined) {
      this.addTrail(person);
      return;
    }
    const latLngs = line.getLatLngs() as LatLng[];
    if ((latLngs[latLngs.length - 2]).distanceTo(person.location) > environment.map.trailPointMinDistance) {
      line.addLatLng(latLng(person.location).clone());
    } else {
      const lineEnd = latLngs[latLngs.length - 1];
      lineEnd.lat = person.location.lat;
      lineEnd.lng = person.location.lng;
    }
  }

  private removePerson(personId: number): void {
    const dot = this.peopleLookUp.get(personId);
    // Check if the creation of the person was not missed because of late join.
    if (dot === undefined) {
      return;
    }
    dot.closePopup();
    dot.unbindPopup();
    this.peopleLayer.removeLayer(dot);
    dot.remove();
    this.peopleLookUp.delete(personId);
  }

  private removeTrail(personId: number): void {
    const line = this.trailsLookUp.get(personId);
    // Check if the creation of the person was not missed because of late join.
    if (line === undefined) {
      return;
    }
    this.trailsLayer.removeLayer(line);
    line.remove();
    this.trailsLookUp.delete(personId);
  }

  private updatePeople(): void {
    if (!this.isActice) {
      return;
    }
    if (this.peopleBuffer === null) {
      requestAnimationFrame(() => this.updatePeople());
      return;
    }
    const people = this.peopleBuffer;
    this.peopleBuffer = null;
    if (environment.map.trailsEnabled) {
      people.forEach(person => {
        switch (person.state) {
          case PersonState.ADDED:
            this.addPerson(person);
            this.addTrail(person);
            break;
          case PersonState.MODIFIED:
            this.modifyPerson(person);
            this.modifyTrail(person);
            break;
          case PersonState.REMOVED:
            this.removePerson(person.id);
            this.removeTrail(person.id);
            break;
        }
      });
    } else {
      people.forEach(person => {
        switch (person.state) {
          case PersonState.ADDED:
            this.addPerson(person);
            break;
          case PersonState.MODIFIED:
            this.modifyPerson(person);
            break;
          case PersonState.REMOVED:
            this.removePerson(person.id);
            break;
        }
      });
    }
    requestAnimationFrame(() => this.updatePeople());
  }

  private updatePeopleWithMeasuring(): void {
    if (!this.isActice) {
      return;
    }
    if (this.peopleBuffer === null) {
      requestAnimationFrame(() => this.updatePeopleWithMeasuring());
      return;
    }
    const people = this.peopleBuffer;
    this.peopleBuffer = null;
    window.performance.measure(MapComponent.MEASURE_UPDATE_PEOPLE);
    if (environment.map.trailsEnabled) {
      people.forEach(person => {
        switch (person.state) {
          case PersonState.ADDED:
            window.performance.measure(MapComponent.MEASURE_ADD_PERSON);
            this.addPerson(person);
            this.addTrail(person);
            window.performance.clearMeasures(MapComponent.MEASURE_ADD_PERSON);
            break;
          case PersonState.MODIFIED:
            window.performance.measure(MapComponent.MEASURE_MODIFY_PERSON);
            this.modifyPerson(person);
            this.modifyTrail(person);
            window.performance.clearMeasures(MapComponent.MEASURE_MODIFY_PERSON);
            break;
          case PersonState.REMOVED:
            window.performance.measure(MapComponent.MEASURE_REMOVE_PERSON);
            this.removePerson(person.id);
            this.removeTrail(person.id);
            window.performance.clearMeasures(MapComponent.MEASURE_REMOVE_PERSON);
            break;
        }
      });
    } else {
      people.forEach(person => {
        switch (person.state) {
          case PersonState.ADDED:
            window.performance.measure(MapComponent.MEASURE_ADD_PERSON);
            this.addPerson(person);
            window.performance.clearMeasures(MapComponent.MEASURE_ADD_PERSON);
            break;
          case PersonState.MODIFIED:
            window.performance.measure(MapComponent.MEASURE_MODIFY_PERSON);
            this.modifyPerson(person);
            window.performance.clearMeasures(MapComponent.MEASURE_MODIFY_PERSON);
            break;
          case PersonState.REMOVED:
            window.performance.measure(MapComponent.MEASURE_REMOVE_PERSON);
            this.removePerson(person.id);
            window.performance.clearMeasures(MapComponent.MEASURE_REMOVE_PERSON);
            break;
        }
      });
    }
    window.performance.clearMeasures(MapComponent.MEASURE_UPDATE_PEOPLE);
    requestAnimationFrame(() => this.updatePeopleWithMeasuring());
  }
}
