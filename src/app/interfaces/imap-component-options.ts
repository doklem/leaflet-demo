import { CircleMarkerOptions } from 'leaflet';
import { ILocation } from './ilocation';
import { ITrailsLayerOptions } from './itrails-layer-options';
import { IPeopleLayerOptions } from './ipeople-layer-options';
import { IBaseLayerOptions } from './ibase-layer-options';

export interface IMapComponentOptions {
    baseLayers: Array<IBaseLayerOptions>;
    initialZoom: number;
    maxZoom: number;
    dots: IPeopleLayerOptions<CircleMarkerOptions>;
    startLocation: ILocation;
    trails: ITrailsLayerOptions;
}
