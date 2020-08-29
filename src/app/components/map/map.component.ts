import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Control, control, map, MapOptions, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleService } from '../../services/people.service';
import { PeopleLayerManager } from '../../classes/people-layer-manager';
import { TrailLayerManager } from '../../classes/trail-layer-manager';
import { IPerson } from '../../interfaces/iperson';
import { PerformanceMeasuringLayerManager } from '../../classes/performance-measuring-layer-manager';
import { LayerManagerBase } from '../../classes/layer-manager-base';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private layerManager: LayerManagerBase;
  private peopleBuffer: Array<IPerson>;
  private peopleSubscription: Subscription;

  @ViewChild('map', { static: true })
  public mapElement: ElementRef<HTMLDivElement>;

  constructor(private peopleService: PeopleService) {
    this.peopleBuffer = null;
  }

  public ngOnDestroy(): void {
    this.peopleSubscription.unsubscribe();
    this.peopleSubscription = null;
    this.peopleBuffer = null;
  }

  public ngOnInit(): void {
    this.layerManager = new PeopleLayerManager();
    const baseLayers: Control.LayersObject = {
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', environment.map.baseLayers),
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', environment.map.baseLayers)
    };
    const overlays: Control.LayersObject = {
      People: this.layerManager.layers
    };
    const layerControl = control.layers(baseLayers, overlays);
    const options: MapOptions = {
      layers: [
        baseLayers['Open Cycle Map'],
        overlays.People
      ],
      zoom: environment.map.initialZoom,
      center: environment.map.startLocation
    };
    if (environment.map.trails.enabled) {
      this.layerManager = new TrailLayerManager(this.layerManager);
      layerControl.addOverlay(this.layerManager.layers, 'Trails');
    }
    if (!environment.production) {
      this.layerManager = new PerformanceMeasuringLayerManager(this.layerManager);
    }
    const t = map(this.mapElement.nativeElement, options).addControl(layerControl).addControl(control.scale());
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);
    requestAnimationFrame(() => this.updatePeople());
  }

  private updatePeople(): void {
    if (this.peopleSubscription === null) {
      return;
    }
    if (this.peopleBuffer !== null) {
      const people = this.peopleBuffer;
      this.peopleBuffer = null;
      this.layerManager.updatePeople(people);
    }
    requestAnimationFrame(() => this.updatePeople());
  }
}
