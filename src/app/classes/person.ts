import { Gender } from '../enums/gender.enum';
import { ILocation } from '../interfaces/ilocation';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class Person implements IPerson {

    public readonly location: ILocation;
    public state: PersonState;

    constructor(
        public readonly id: number,
        public readonly eta: number,
        public readonly gender: Gender,
        public readonly radianOffset: number,
        public readonly rotationCenter: ILocation,
        public readonly rotationDirection: boolean,
        public readonly rotationRadius: number) {
        this.location =
        {
            lat: 0,
            lng: 0
        };
        this.state = PersonState.ADDED;
    }
}
