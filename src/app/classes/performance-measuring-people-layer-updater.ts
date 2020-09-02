import { PeopleLayerUpdater } from './people-layer-updater';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class PerformanceMeasuringPeopleLayerUpdater extends PeopleLayerUpdater {

    private static readonly MEASURE_ADD_PERSON = 'Add person';
    private static readonly MEASURE_MODIFY_PERSON = 'Modify person';
    private static readonly MEASURE_REMOVE_PERSON = 'Remove person';
    private static readonly MEASURE_UPDATE_PEOPLE = 'Update people';

    public updatePeople(people: Array<IPerson>): void {
        window.performance.measure(PerformanceMeasuringPeopleLayerUpdater.MEASURE_UPDATE_PEOPLE);
        people.forEach(person => {
            switch (person.state) {
                case PersonState.ADDED:
                    window.performance.measure(PerformanceMeasuringPeopleLayerUpdater.MEASURE_ADD_PERSON);
                    this.layers.forEach(manager => manager.addPerson(person));
                    window.performance.clearMeasures(PerformanceMeasuringPeopleLayerUpdater.MEASURE_ADD_PERSON);
                    break;
                case PersonState.MODIFIED:
                    window.performance.measure(PerformanceMeasuringPeopleLayerUpdater.MEASURE_MODIFY_PERSON);
                    this.layers.forEach(manager => manager.modifyPerson(person));
                    window.performance.clearMeasures(PerformanceMeasuringPeopleLayerUpdater.MEASURE_MODIFY_PERSON);
                    break;
                case PersonState.REMOVED:
                    window.performance.measure(PerformanceMeasuringPeopleLayerUpdater.MEASURE_REMOVE_PERSON);
                    this.layers.forEach(manager => manager.removePerson(person.id));
                    window.performance.clearMeasures(PerformanceMeasuringPeopleLayerUpdater.MEASURE_REMOVE_PERSON);
                    break;
            }
        });
        window.performance.clearMeasures(PerformanceMeasuringPeopleLayerUpdater.MEASURE_UPDATE_PEOPLE);
    }
}
