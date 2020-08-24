import { Person } from './person';
import { IPerson } from '../interfaces/iperson';
import { IPeopleWorkerOptions } from './../interfaces/ipeople-worker-options';
import { PersonState } from '../enums/person-state.enum';

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
        person.location.lat = person.rotationCenter.lat + (Math.sin(radians + person.radianOffset) * person.rotationRadius);
        if (person.rotationDirection) {
            person.location.lng = person.rotationCenter.lng - (Math.cos(radians + person.radianOffset) * person.rotationRadius);
        } else {
            person.location.lng = person.rotationCenter.lng + (Math.cos(radians + person.radianOffset) * person.rotationRadius);
        }
    }

    private static toIPerson(person: Person): IPerson {
        if (person.state === PersonState.REMOVED) {
            return {
                id: person.id,
                state: person.state
            };
        }
        return {
            eta: person.eta,
            gender: person.gender,
            id: person.id,
            location: person.location,
            state: person.state
        };
    }

    public initialize(options: IPeopleWorkerOptions): void {
        this.options = options;
        this.rotationHalfTime = this.options.rotationTime * 0.5;
        const radians = this.getRadians();
        for (let i = 0; i < this.options.peopleMinCount; i++) {
            this.people.push(this.createPerson(radians, 0));
        }
        postMessage(this.people.map(person => PeopleWorkerLogic.toIPerson(person)), null);
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
        const now = Date.now();
        const radians = this.getRadians();
        let activePeopleCount = 0;
        this.people.forEach(person => {
            // Mark people as deleted, which did leave
            if (person.eta < now) {
                person.state = PersonState.REMOVED;
                return;
            }
            // Update people, which did move
            PeopleWorkerLogic.setLocation(person, radians);
            person.state = PersonState.MODIFIED;
            activePeopleCount++;
        });
        // Add new people, if there are too few
        if (activePeopleCount < this.options.peopleMinCount) {
            for (let i = 0; i < this.options.peopleBatchSize; i++) {
                this.people.push(this.createPerson(radians, this.options.peopleMinLifetime));
            }
        }
        postMessage(this.people.map(person => PeopleWorkerLogic.toIPerson(person)), null);
        // Remove people, which are marked as deleted
        this.people = this.people.filter(person => person.state !== PersonState.REMOVED);
        this.timeoutId = setTimeout(() => this.movePeople(), this.options.moveDelay);
    }
}
