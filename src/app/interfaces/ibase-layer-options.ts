import { TileLayerOptions } from 'leaflet';

export interface IBaseLayerOptions {
    layer: TileLayerOptions;
    title: string;
    url: string;
}
