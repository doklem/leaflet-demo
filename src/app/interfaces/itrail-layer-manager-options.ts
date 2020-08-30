import { PolylineOptions } from 'leaflet';
import { ILayerManagerOptions } from './ilayer-manager-options';

export interface ITrailLayerManagerOptions extends ILayerManagerOptions<PolylineOptions> {
    pointMinDistance: number;
}
