import { TileLayerOptions, WMSOptions } from 'leaflet';

export interface IBaseLayerOptions {
    layer: TileLayerOptions | WMSOptions;
    title: string;
    url: string;
}
