import { LayerUpdater } from './layer-updater';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class PerformanceMeasuringLayerUpdater extends LayerUpdater {

    private static readonly MEASURE_ADD_PERSON = 'Add person';
    private static readonly MEASURE_MODIFY_PERSON = 'Modify person';
    private static readonly MEASURE_REMOVE_PERSON = 'Remove person';
    private static readonly MEASURE_UPDATE_PEOPLE = 'Update people';

    public updatePeople(people: Array<IPerson>): void {
        window.performance.measure(PerformanceMeasuringLayerUpdater.MEASURE_UPDATE_PEOPLE);
        people.forEach(person => {
            switch (person.state) {
                case PersonState.ADDED:
                    window.performance.measure(PerformanceMeasuringLayerUpdater.MEASURE_ADD_PERSON);
                    this.managers.forEach(manager => manager.addPerson(person));
                    window.performance.clearMeasures(PerformanceMeasuringLayerUpdater.MEASURE_ADD_PERSON);
                    break;
                case PersonState.MODIFIED:
                    window.performance.measure(PerformanceMeasuringLayerUpdater.MEASURE_MODIFY_PERSON);
                    this.managers.forEach(manager => manager.modifyPerson(person));
                    window.performance.clearMeasures(PerformanceMeasuringLayerUpdater.MEASURE_MODIFY_PERSON);
                    break;
                case PersonState.REMOVED:
                    window.performance.measure(PerformanceMeasuringLayerUpdater.MEASURE_REMOVE_PERSON);
                    this.managers.forEach(manager => manager.removePerson(person.id));
                    window.performance.clearMeasures(PerformanceMeasuringLayerUpdater.MEASURE_REMOVE_PERSON);
                    break;
            }
        });
        window.performance.clearMeasures(PerformanceMeasuringLayerUpdater.MEASURE_UPDATE_PEOPLE);
    }
}
