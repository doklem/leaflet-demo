import { Gender } from '../enums/gender.enum';
import { ILocation } from './ilocation';
import { PersonState } from '../enums/person-state.enum';

export interface IPerson {
    readonly depatureTime?: number;
    readonly gender?: Gender;
    readonly id: number;
    readonly location?: ILocation;
    state: PersonState;
}
