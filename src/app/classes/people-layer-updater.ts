import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';
import { IPeopleLayer } from '../interfaces/ipeople-layer';

export class PeopleLayerUpdater {

    protected readonly layers: Array<IPeopleLayer>;

    constructor() {
        this.layers = [];
    }

    public addLayerGroup<TPeopleLayer extends IPeopleLayer>(layer: TPeopleLayer): TPeopleLayer {
        this.layers.push(layer);
        return layer;
    }

    public updatePeople(people: Array<IPerson>): void {
        people.forEach(person => {
            switch (person.state) {
                case PersonState.ADDED:
                    this.layers.forEach(layer => layer.addPerson(person));
                    break;
                case PersonState.MODIFIED:
                    this.layers.forEach(layer => layer.modifyPerson(person));
                    break;
                case PersonState.REMOVED:
                    this.layers.forEach(layer => layer.removePerson(person.id));
                    break;
            }
        });
    }
}
