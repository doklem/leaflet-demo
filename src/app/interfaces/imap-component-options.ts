import { CircleMarkerOptions } from 'leaflet';
import { ILocation } from './ilocation';
import { ITrailLayerManagerOptions } from './itrail-layer-manager-options';
import { ILayerManagerOptions } from './ilayer-manager-options';
import { IBaseLayerOptions } from './ibase-layer-options';

export interface IMapComponentOptions {
    baseLayers: Array<IBaseLayerOptions>;
    initialZoom: number;
    maxZoom: number;
    people: ILayerManagerOptions<CircleMarkerOptions>;
    startLocation: ILocation;
    trails: ITrailLayerManagerOptions;
}
