import { Person } from './person';
import { IPerson } from '../interfaces/iperson';
import { IPeopleWorkerOptions } from './../interfaces/ipeople-worker-options';

export class PeopleWorkerLogic {

    private idCounter: number;
    private options: IPeopleWorkerOptions;
    private people: Array<Person>;
    private rotationHalfTime: number;
    private timeoutId: number;

    constructor() {
        this.idCounter = 0;
        this.people = new Array<Person>();
        this.timeoutId = 0;
    }

    private static setLocation(person: Person, radians: number): void {
        const location = {
            lat: person.rotationCenter.lat + (Math.sin(radians + person.radianOffset) * person.rotationRadius),
            lng: 0
        };
        if (person.rotationDirection) {
            location.lng = person.rotationCenter.lng - (Math.cos(radians + person.radianOffset) * person.rotationRadius);
        } else {
            location.lng = person.rotationCenter.lng + (Math.cos(radians + person.radianOffset) * person.rotationRadius);
        }
        person.trail.unshift(location);
    }

    private static toIPerson(person: Person): IPerson {
        return {
            eta: person.eta,
            gender: person.gender,
            id: person.id,
            trail: person.trail
        };
    }

    public initialize(options: IPeopleWorkerOptions): void {
        this.options = options;
        this.rotationHalfTime = this.options.rotationTime * 0.5;
        const radians = this.getRadians();
        for (let i = 0; i < this.options.peopleMinCount; i++) {
            this.people.push(this.createPerson(radians, 0));
        }
        this.movePeople();
    }

    private createPerson(radians: number, minLifeTime: number): Person {
        const person = new Person(
            this.idCounter++,
            Date.now() + minLifeTime + Math.random() * this.options.peopleLifetimeAddition,
            this.idCounter % 3,
            Math.random() * (Math.PI + Math.PI),
            {
                lat: this.options.startLocation.lat + (Math.random() * this.options.spreadRadius),
                lng: this.options.startLocation.lng + (Math.random() * this.options.spreadRadius)
            },
            this.idCounter % 2 === 0,
            this.options.rotationMaxRadius * Math.random());
        PeopleWorkerLogic.setLocation(person, radians);
        return person;
    }

    private getRadians(): number {
        return ((Date.now() % this.options.rotationTime) / this.rotationHalfTime) * Math.PI;
    }

    private movePeople(): void {
        clearTimeout(this.timeoutId);
        // Remove people, which did leave
        const now = Date.now();
        this.people = this.people.filter(person => person.eta > now);
        // Update people, which did move
        const radians = this.getRadians();
        this.people.forEach(person => PeopleWorkerLogic.setLocation(person, radians));
        // Add new people, if there are too few
        if (this.people.length < this.options.peopleMinCount) {
            for (let i = 0; i < this.options.peopleBatchSize; i++) {
                this.people.push(this.createPerson(radians, this.options.peopleMinLifetime));
            }
        }
        postMessage(this.people.map(person => PeopleWorkerLogic.toIPerson(person)), null);
        this.timeoutId = setTimeout(() => this.movePeople(), this.options.moveDelay);
    }
}
