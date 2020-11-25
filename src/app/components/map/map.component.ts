import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { canvas, Control, control, Map, map, MapOptions, LeafletMouseEvent, tileLayer, TileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PeopleService } from '../../services/people.service';
import { WalkwayService } from '../../services/walkway.service';
import { IPerson } from '../../interfaces/iperson';
import { PeopleLayerUpdater } from '../../classes/people-layer-updater';
import { PerformanceMeasuringPeopleLayerUpdater } from '../../classes/performance-measuring-people-layer-updater';
import { IPeopleLayerOptions } from '../../interfaces/ipeople-layer-options';
import { PeopleLayerBase } from '../../classes/layers/people-layer-base';
import { DotsLayer } from '../../classes/layers/dots-layer';
import { TrailsLayer } from '../../classes/layers/trails-layer';
import { WaypointsLayer } from '../../classes/layers/waypoints-layer';
import { WalkwaysLayer } from '../../classes/layers/walkways-layer';

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

  constructor(
    private readonly peopleService: PeopleService,
    private readonly walkwayService: WalkwayService) {
    this.peopleBuffer = null;
  }

  private static logClick(e: LeafletMouseEvent): void {
    console.log('location: { lat: ' + e.latlng.lat.toFixed(5) + ', lng: ' + e.latlng.lng.toFixed(5) + ' },');
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
    let baseLayer: TileLayer;
    environment.view.baseLayers.forEach((layerOptions, index) => {
      if ('layers' in layerOptions.layer) {
        baseLayer = new TileLayer.WMS(layerOptions.url, layerOptions.layer);
      } else {
        baseLayer = tileLayer(layerOptions.url, layerOptions.layer);
      }
      layerControl.addBaseLayer(baseLayer, layerOptions.title);
      if (index === 0) {
        peopleMap.addLayer(baseLayer);
      }
    });
    this.layerUpdater = environment.production ? new PeopleLayerUpdater() : new PerformanceMeasuringPeopleLayerUpdater();
    this.addPeopleLayer(peopleMap, layerControl, environment.view.dots, (options) => new DotsLayer(options));
    this.addPeopleLayer(peopleMap, layerControl, environment.view.trails, (options) => new TrailsLayer(options));
    this.peopleSubscription = this.peopleService.people$.subscribe(people => this.peopleBuffer = people);

    if (environment.view.waypoints.enabled) {
      const waypointsLayer = new WaypointsLayer(environment.view.waypoints);
      waypointsLayer.setWaypoints(environment.worker.waypoints);
      layerControl.addOverlay(waypointsLayer, environment.view.waypoints.title);
      if (environment.view.waypoints.initialVisible) {
        peopleMap.addLayer(waypointsLayer);
      }
    }
    if (environment.view.walkways.enabled) {
      const walkwaysLayer = new WalkwaysLayer(environment.view.walkways);
      walkwaysLayer.setWalkways(this.walkwayService.walkways);
      layerControl.addOverlay(walkwaysLayer, environment.view.walkways.title);
      if (environment.view.walkways.initialVisible) {
        peopleMap.addLayer(walkwaysLayer);
      }
    }

    if (environment.production !== true) {
      peopleMap.on('click', (e: LeafletMouseEvent) => MapComponent.logClick(e));
    }

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
