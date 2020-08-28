import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';
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

  private readonly layerManager: LayerManagerBase;

  private isActice: boolean;
  private peopleBuffer: Array<IPerson>;
  private peopleSubscription: Subscription;

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor(private peopleService: PeopleService) {
    this.isActice = false;
    this.peopleBuffer = null;
    this.layerManager = new PeopleLayerManager();
    this.layersControl = {
      baseLayers: {
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', environment.map.baseLayers),
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', environment.map.baseLayers)
      },
      overlays: {
        People: this.layerManager.layers
      }
    };
    this.options = {
      layers: [
        this.layersControl.baseLayers['Open Cycle Map'],
        this.layersControl.overlays.People
      ],
      zoom: environment.map.initialZoom,
      center: environment.map.startLocation
    };
    if (environment.map.trailsEnabled) {
      this.layerManager = new TrailLayerManager(this.layerManager);
      this.layersControl.overlays.Trails = this.layerManager.layers;
    }
    if (!environment.production) {
      this.layerManager = new PerformanceMeasuringLayerManager(this.layerManager);
    }
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
    requestAnimationFrame(() => this.updatePeople());
  }

  private updatePeople(): void {
    if (!this.isActice) {
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
