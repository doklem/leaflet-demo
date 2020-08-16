import { ILocation } from './ilocation';

export interface IPeopleWorkerOptions {
    moveDelay: number;
    peopleCount: number;
    spreadRadius: number;
    startLocation: ILocation;
}
