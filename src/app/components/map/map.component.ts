import { Component } from '@angular/core';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletControlLayersConfig } from '@asymmetrik/ngx-leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private static readonly BASE_LAYER_OPTIONS = { maxZoom: 19, attribution: '...' };
  private static readonly START_LOCATION = latLng(46.999995, 7.456952);

  public readonly layersControl: LeafletControlLayersConfig;
  public readonly options: MapOptions;

  constructor() {
    this.layersControl = {
      baseLayers: {
        'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', MapComponent.BASE_LAYER_OPTIONS),
        'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', MapComponent.BASE_LAYER_OPTIONS)
      },
      overlays: { }
    };
    this.options = {
      layers: [
        this.layersControl.baseLayers['Open Street Map']
      ],
      zoom: 17,
      center: MapComponent.START_LOCATION
    };
  }
}
