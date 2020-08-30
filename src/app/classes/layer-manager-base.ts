import { LayerGroup, layerGroup } from 'leaflet';
import { IPerson } from '../interfaces/iperson';

export abstract class LayerManagerBase {

    public readonly layers: LayerGroup;

    constructor() {
        this.layers = layerGroup();
    }

    public abstract addPerson(person: IPerson): void;

    public abstract modifyPerson(person: IPerson): void;

    public abstract removePerson(personId: number): void;
}
