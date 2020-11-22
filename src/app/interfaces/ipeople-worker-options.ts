import { IWaypoint } from './iwaypoint';

export interface IPeopleWorkerOptions {
    moveDelay: number;
    peopleAfterlifeDuration: number;
    peopleBatchSize: number;
    peopleMinCount: number;
    waypoints: Array<IWaypoint>;
}
