import { LayerUpdater } from './layer-updater';
import { IPerson } from '../interfaces/iperson';

export class PerformanceMeasuringLayerUpdater extends LayerUpdater {

    private static readonly MEASURE_UPDATE_PEOPLE = 'Update people';

    public updatePeople(people: Array<IPerson>): void {
        window.performance.measure(PerformanceMeasuringLayerUpdater.MEASURE_UPDATE_PEOPLE);
        super.updatePeople(people);
        window.performance.clearMeasures(PerformanceMeasuringLayerUpdater.MEASURE_UPDATE_PEOPLE);
    }
}
