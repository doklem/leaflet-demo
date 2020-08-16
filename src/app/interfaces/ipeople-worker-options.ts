import { ILocation } from './ilocation';

export interface IPeopleWorkerOptions {
    moveDelay: number;
    peopleBatchSize: number;
    peopleLifetimeAddition: number;
    peopleMinCount: number;
    peopleMinLifetime: number;
    rotationMaxRadius: number;
    rotationTime: number;
    spreadRadius: number;
    startLocation: ILocation;
}
