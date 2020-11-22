import { LayerOptions } from 'leaflet';
import { IOverlayOptions } from './ioverlay-options';

export interface IPeopleLayerOptions<TLayerOptions extends LayerOptions> extends IOverlayOptions {
    femaleLayer: TLayerOptions;
    maleLayer: TLayerOptions;
    otherLayer: TLayerOptions;
}
