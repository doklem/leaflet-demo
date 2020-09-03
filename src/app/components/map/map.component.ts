import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { canvas, Control, control, Layer, Map, map, tileLayer, MapOptions } from 'leaflet';
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
    const layerControl = control.layers();
    const mapOptionsClone: MapOptions = JSON.parse(JSON.stringify(environment.view.map));
    mapOptionsClone.renderer = canvas();
    const peopleMap = map(this.mapElement.nativeElement, mapOptionsClone)
      .addControl(layerControl)
      .addControl(control.scale());
    let baseLayer: Layer;
    environment.view.baseLayers.forEach((layerOptions, index) => {
      baseLayer = tileLayer(layerOptions.url, layerOptions.layer);
      layerControl.addBaseLayer(baseLayer, layerOptions.title);
      if (index === 0) {
        peopleMap.addLayer(baseLayer);
      }
    });
    this.layerUpdater = environment.production ? new PeopleLayerUpdater() : new PerformanceMeasuringPeopleLayerUpdater();
    this.addPeopleLayer(peopleMap, layerControl, environment.view.dots, (options) => new DotsLayer(options));
    this.addPeopleLayer(peopleMap, layerControl, environment.view.trails, (options) => new TrailsLayer(options));
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);
    requestAnimationFrame(() => this.updatePeople());
  }

  private addPeopleLayer<TLayer extends PeopleLayerBase<any, any>, TLayerOptions extends IPeopleLayerOptions<any>>(
    peopleMap: Map,
    layerControl: Control.Layers,
    options: TLayerOptions,
    creator: (options: TLayerOptions) => TLayer): void {
    if (options.enabled) {
      const layer = this.layerUpdater.addLayerGroup(creator(options));
      layerControl.addOverlay(layer, options.title);
      if (options.initialVisible) {
        peopleMap.addLayer(layer);
      }
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
