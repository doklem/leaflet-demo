import { CircleMarkerOptions, TileLayerOptions } from 'leaflet';
import { ILocation } from './ilocation';
import { ITrailLayerManagerOptions } from './itrail-layer-manager-options';
import { ILayerManagerOptions } from './ilayer-manager-options';

export interface IMapComponentOptions {
    baseLayers: TileLayerOptions;
    initialZoom: number;
    people: ILayerManagerOptions<CircleMarkerOptions>;
    startLocation: ILocation;
    trails: ITrailLayerManagerOptions;
}
