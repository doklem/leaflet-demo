import { ILocation } from './ilocation';

export interface IWaypoint {
    connections?: Array<string>;
    id: string;
    entranceGroup?: string;
    location: ILocation;
    radius: number;
}
