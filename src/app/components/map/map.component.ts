import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Control, control, map, MapOptions, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleService } from '../../services/people.service';
import { IPerson } from '../../interfaces/iperson';
import { PeopleLayerUpdater } from '../../classes/people-layer-updater';
import { PerformanceMeasuringPeopleLayerUpdater } from '../../classes/performance-measuring-people-layer-updater';
import { IPeopleLayerOptions } from '../../interfaces/ipeople-layer-options';
import { PeopleLayerBase } from '../../classes/layers/people-layer-base';
import { DotsLayer } from '../../classes/layers/dots-layer';
import { TrailsLayer } from '../../classes/layers/trails-layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy, OnInit {

  private layerUpdater: PeopleLayerUpdater;
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
    const baseLayers: Control.LayersObject = {};
    environment.map.baseLayers.forEach(layerOptions => baseLayers[layerOptions.title] = tileLayer(layerOptions.url, layerOptions.layer));
    const mapOptions: MapOptions = {
      center: environment.map.startLocation,
      layers: [
        baseLayers[environment.map.baseLayers[0].title]
      ],
      maxZoom: environment.map.maxZoom,
      zoom: environment.map.initialZoom
    };
    this.layerUpdater = environment.production ? new PeopleLayerUpdater() : new PerformanceMeasuringPeopleLayerUpdater();
    const layerControl = control.layers(baseLayers, {});
    this.addLayer(mapOptions, layerControl, environment.map.dots, (options) => new DotsLayer(options));
    this.addLayer(mapOptions, layerControl, environment.map.trails, (options) => new TrailsLayer(options));
    map(this.mapElement.nativeElement, mapOptions)
      .addControl(layerControl)
      .addControl(control.scale());
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);
    requestAnimationFrame(() => this.updatePeople());
  }

  private addLayer<TLayer extends PeopleLayerBase<any, any>, TLayerOptions extends IPeopleLayerOptions<any>>(
    mapOptions: MapOptions,
    layerControl: Control.Layers,
    options: TLayerOptions,
    creator: (options: TLayerOptions) => TLayer): void {
    if (options.enabled) {
      const layer = this.layerUpdater.addLayerGroup(creator(options));
      if (options.initialVisible) {
        mapOptions.layers.push(layer);
      }
      layerControl.addOverlay(layer, options.title);
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
