import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';
import { LayerManagerBase } from './layer-manager-base';

export class LayerUpdater {

    protected readonly managers: Array<LayerManagerBase>;

    constructor() {
        this.managers = [];
    }

    public addManager<TLayerManager extends LayerManagerBase>(manager: TLayerManager): TLayerManager {
        this.managers.push(manager);
        return manager;
    }

    public updatePeople(people: Array<IPerson>): void {
        people.forEach(person => {
            switch (person.state) {
                case PersonState.ADDED:
                    this.managers.forEach(manager => manager.addPerson(person));
                    break;
                case PersonState.MODIFIED:
                    this.managers.forEach(manager => manager.modifyPerson(person));
                    break;
                case PersonState.REMOVED:
                    this.managers.forEach(manager => manager.removePerson(person.id));
                    break;
            }
        });
    }
}
