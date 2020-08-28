import { LayerManagerBase } from './layer-manager-base';
import { IPerson } from '../interfaces/iperson';

export class PerformanceMeasuringLayerManager extends LayerManagerBase {

    private static readonly MEASURE_ADD_PERSON = 'Add person';
    private static readonly MEASURE_MODIFY_PERSON = 'Modify person';
    private static readonly MEASURE_REMOVE_PERSON = 'Remove person';
    private static readonly MEASURE_UPDATE_PEOPLE = 'Update people';

    constructor(root: LayerManagerBase) {
        super(root, true);
    }

    public addPerson(person: IPerson): void {
        window.performance.measure(PerformanceMeasuringLayerManager.MEASURE_ADD_PERSON);
        this.root.addPerson(person);
        window.performance.clearMeasures(PerformanceMeasuringLayerManager.MEASURE_ADD_PERSON);
    }

    public modifyPerson(person: IPerson): void {
        window.performance.measure(PerformanceMeasuringLayerManager.MEASURE_MODIFY_PERSON);
        this.root.modifyPerson(person);
        window.performance.clearMeasures(PerformanceMeasuringLayerManager.MEASURE_MODIFY_PERSON);
    }

    public removePerson(personId: number): void {
        window.performance.measure(PerformanceMeasuringLayerManager.MEASURE_REMOVE_PERSON);
        this.root.removePerson(personId);
        window.performance.clearMeasures(PerformanceMeasuringLayerManager.MEASURE_REMOVE_PERSON);
    }

    public updatePeople(people: Array<IPerson>): void {
        window.performance.measure(PerformanceMeasuringLayerManager.MEASURE_UPDATE_PEOPLE);
        super.updatePeople(people);
        window.performance.clearMeasures(PerformanceMeasuringLayerManager.MEASURE_UPDATE_PEOPLE);
    }
}
