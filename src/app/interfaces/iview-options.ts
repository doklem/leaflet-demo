import { CircleMarkerOptions, MapOptions } from 'leaflet';
import { ITrailsLayerOptions } from './itrails-layer-options';
import { IPeopleLayerOptions } from './ipeople-layer-options';
import { IBaseLayerOptions } from './ibase-layer-options';
import { IWalkwaysLayerOptions } from './iwalkways-layer-options';
import { IWaypointsLayerOptions } from './iwaypoints-layer-options';

export interface IViewOptions {
    baseLayers: Array<IBaseLayerOptions>;
    dots: IPeopleLayerOptions<CircleMarkerOptions>;
    map: MapOptions;
    trails: ITrailsLayerOptions;
    walkways: IWalkwaysLayerOptions;
    waypoints: IWaypointsLayerOptions;
}
