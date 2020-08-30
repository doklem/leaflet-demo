import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Control, control, map, MapOptions, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleService } from '../../services/people.service';
import { IPerson } from '../../interfaces/iperson';
import { PeopleLayerManager } from '../../classes/people-layer-manager';
import { TrailLayerManager } from '../../classes/trail-layer-manager';
import { LayerUpdater } from '../../classes/layer-updater';
import { PerformanceMeasuringLayerUpdater } from '../../classes/performance-measuring-layer-updater';
import { LayerManagerBase } from '../../classes/layer-manager-base';
import { ILayerManagerOptions } from 'src/app/interfaces/ilayer-manager-options';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private layerUpdater: LayerUpdater;
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
    const baseLayers: Control.LayersObject = {
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', environment.map.baseLayers),
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', environment.map.baseLayers)
    };
    const mapOptions: MapOptions = {
      layers: [
        baseLayers['Open Cycle Map']
      ],
      zoom: environment.map.initialZoom,
      center: environment.map.startLocation
    };
    this.layerUpdater = environment.production ? new PerformanceMeasuringLayerUpdater() : new LayerUpdater();
    const layerControl = control.layers(baseLayers, {});
    this.addLayer(mapOptions, layerControl, environment.map.people, () => new PeopleLayerManager());
    this.addLayer(mapOptions, layerControl, environment.map.trails, () => new TrailLayerManager());
    map(this.mapElement.nativeElement, mapOptions)
      .addControl(layerControl)
      .addControl(control.scale());
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);
    requestAnimationFrame(() => this.updatePeople());
  }

  private addLayer<TLayerManager extends LayerManagerBase>(
    mapOptions: MapOptions,
    layerControl: Control.Layers,
    options: ILayerManagerOptions<any>,
    creator: () => TLayerManager): void {
    if (options.enabled) {
      const manager = this.layerUpdater.addManager(creator());
      if (options.initialVisible) {
        mapOptions.layers.push(manager.layers);
      }
      layerControl.addOverlay(manager.layers, options.title);
    }
  }

  private updatePeople(): void {
    if (this.peopleSubscription === null) {
      return;
    }
    if (this.peopleBuffer !== null) {
      const people = this.peopleBuffer;
      this.peopleBuffer = null;
      this.layerUpdater.updatePeople(people);
    }
    requestAnimationFrame(() => this.updatePeople());
  }
}
