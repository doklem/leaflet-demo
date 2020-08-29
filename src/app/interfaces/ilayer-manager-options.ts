import { LayerOptions } from 'leaflet';

export interface ILayerManagerOptions<TLayerOptions extends LayerOptions> {
    femaleLayer: TLayerOptions;
    maleLayer: TLayerOptions;
    otherLayer: TLayerOptions;
}
