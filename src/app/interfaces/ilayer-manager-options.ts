import { LayerOptions } from 'leaflet';

export interface ILayerManagerOptions<TLayerOptions extends LayerOptions> {
    enabled: boolean;
    femaleLayer: TLayerOptions;
    initialVisible: boolean;
    maleLayer: TLayerOptions;
    otherLayer: TLayerOptions;
    title: string;
}
