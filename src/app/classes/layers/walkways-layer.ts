import { LayerGroup, Polyline } from 'leaflet';
import { IWalkwaysLayerOptions } from './../../interfaces/iwalkways-layer-options';
import { IWalkway } from 'src/app/interfaces/iwalkway';

export class WalkwaysLayer extends LayerGroup {

    constructor(protected readonly options: IWalkwaysLayerOptions) {
        super([], options);
    }

    public setWalkways(walkways: Array<IWalkway>): void {
        walkways.forEach(walkway => this.addLayer(new Polyline([walkway.start, walkway.end], this.options)));
    }
}
