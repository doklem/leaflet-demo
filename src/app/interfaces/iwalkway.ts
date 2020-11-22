import { ILocation } from './ilocation';

export interface IWalkway {
    distance?: number;
    end: ILocation;
    start: ILocation;
}
