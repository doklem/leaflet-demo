import { IViewOptions } from './iview-options';
import { IPeopleWorkerOptions } from './ipeople-worker-options';

export interface IEnvironment {
    production: boolean;
    view: IViewOptions;
    worker: IPeopleWorkerOptions;
}
