import { LayerOptions } from 'leaflet';

export interface IOverlayOptions extends LayerOptions {
    enabled: boolean;
    initialVisible: boolean;
    title: string;
}
