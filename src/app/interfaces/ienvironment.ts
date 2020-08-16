import { IMapComponentOptions } from './imap-component-options';
import { IPeopleWorkerOptions } from './ipeople-worker-options';

export interface IEnvironment {
    map: IMapComponentOptions;
    production: boolean;
    worker: IPeopleWorkerOptions;
}
