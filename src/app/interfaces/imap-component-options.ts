import { CircleMarkerOptions, TileLayerOptions, PolylineOptions } from 'leaflet';
import { ILocation } from './ilocation';

export interface IMapComponentOptions {
    baseLayers: TileLayerOptions;
    femalePersonLayer: CircleMarkerOptions;
    initialZoom: number;
    malePersonLayer: CircleMarkerOptions;
    otherPersonLayer: CircleMarkerOptions;
    startLocation: ILocation;
    trailsLayer: PolylineOptions;
}
