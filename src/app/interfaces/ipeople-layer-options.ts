import { LayerOptions } from 'leaflet';

export interface IPeopleLayerOptions<TLayerOptions extends LayerOptions> extends LayerOptions {
    enabled: boolean;
    femaleLayer: TLayerOptions;
    initialVisible: boolean;
    maleLayer: TLayerOptions;
    otherLayer: TLayerOptions;
    title: string;
}
