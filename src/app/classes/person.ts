import FastVector from 'fast-vector';
import { Gender } from '../enums/gender.enum';
import { ILocation } from '../interfaces/ilocation';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class Person implements IPerson {

    public position: FastVector;
    public state: PersonState;
    public arrivalTime?: number;

    constructor(
        public readonly depatureTime: number,
        public readonly id: number,
        public readonly journey: Array<FastVector>,
        public readonly gender: Gender,
        public readonly speed: number) {
        this.position = this.journey[0];
        this.state = PersonState.ADDED;
    }

    public get location(): ILocation {
        return { lng: this.position.x, lat: this.position.y };
    }
}
