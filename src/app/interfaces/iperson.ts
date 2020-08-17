import { Gender } from '../enums/gender.enum';
import { ILocation } from './ilocation';

export interface IPerson {
    readonly eta: number;
    readonly gender: Gender;
    readonly id: number;
    readonly location: ILocation;
}
