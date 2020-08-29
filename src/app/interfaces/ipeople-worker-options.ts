import { ILocation } from './ilocation';

export interface IPeopleWorkerOptions {
    moveDelay: number;
    peopleAfterlifeDuration: number;
    peopleBatchSize: number;
    peopleLifetimeAddition: number;
    peopleMinCount: number;
    peopleMinLifetime: number;
    rotationMinRadius: number;
    rotationRadiusAddition: number;
    rotationTime: number;
    spreadRadius: number;
    startLocation: ILocation;
}
