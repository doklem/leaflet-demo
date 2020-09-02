import { PolylineOptions } from 'leaflet';
import { IPeopleLayerOptions } from './ipeople-layer-options';

export interface ITrailsLayerOptions extends IPeopleLayerOptions<PolylineOptions> {
    pointMinDistance: number;
}
