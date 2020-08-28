import { LayerGroup, layerGroup } from 'leaflet';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export abstract class LayerManagerBase {

    public readonly layers: LayerGroup;

    constructor(protected readonly root?: LayerManagerBase, useRootLayerGroup?: boolean) {
        if (useRootLayerGroup ?? false) {
            this.layers = root.layers;
        } else {
            this.layers = layerGroup();
        }
    }

    public abstract addPerson(person: IPerson): void;

    public abstract modifyPerson(person: IPerson): void;

    public abstract removePerson(personId: number): void;

    public updatePeople(people: Array<IPerson>): void {
        people.forEach(person => {
            switch (person.state) {
                case PersonState.ADDED:
                    this.addPerson(person);
                    break;
                case PersonState.MODIFIED:
                    this.modifyPerson(person);
                    break;
                case PersonState.REMOVED:
                    this.removePerson(person.id);
                    break;
            }
        });
    }
}
