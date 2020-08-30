import { Person } from './person';
import { IPeopleWorkerOptions } from './../interfaces/ipeople-worker-options';
import { PersonState } from '../enums/person-state.enum';
import { IPerson } from '../interfaces/iperson';

export class PeopleWorkerLogic {

    private idCounter: number;
    private options: IPeopleWorkerOptions;
    private people: Array<Person>;
    private rotationHalfTime: number;
    private readonly sendPeople: (people: Array<IPerson>) => void;
    private timeoutId: number;

    constructor(sendPeople: (people: Array<IPerson>) => void) {
        this.sendPeople = sendPeople;
        this.idCounter = 0;
        this.people = new Array<Person>();
        this.timeoutId = 0;
    }

    private static setLocation(person: Person, radians: number): void {
        person.location.lat = person.rotationCenter.lat + Math.sin(radians + person.radianOffset) * person.rotationRadius;
        if (person.rotationDirection) {
            person.location.lng = person.rotationCenter.lng - Math.cos(radians + person.radianOffset) * person.rotationRadius;
        } else {
            person.location.lng = person.rotationCenter.lng + Math.cos(radians + person.radianOffset) * person.rotationRadius;
        }
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
                lat: this.options.startLocation.lat + Math.random() * this.options.spreadRadius,
                lng: this.options.startLocation.lng + Math.random() * this.options.spreadRadius
            },
            this.idCounter % 2 === 0,
            this.options.rotationMinRadius + this.options.rotationRadiusAddition * Math.random());
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
            // Ignore people, which are in their afterlife
            if (person.state === PersonState.REMOVED) {
                return;
            }
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
        this.sendPeople(this.people);
        // Remove people, which have reached the end of their afterlife.
        const end = now - this.options.peopleAfterlifeDuration;
        this.people = this.people.filter(person => person.eta > end);
        this.timeoutId = setTimeout(() => this.movePeople(), this.options.moveDelay);
    }
}
