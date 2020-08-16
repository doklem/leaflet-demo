import { IPerson } from '../interfaces/iperson';
import { IPeopleWorkerOptions } from '../interfaces/ipeople-worker-options';

export class PeopleWorkerLogic {

    private options: IPeopleWorkerOptions;
    private timeoutId: number;

    constructor() {
        this.timeoutId = 0;
    }

    public initialize(options: IPeopleWorkerOptions): void {
        this.options = options;
        this.movePeople();
    }

    private movePeople(): void {
        clearTimeout(this.timeoutId);
        const people: Array<IPerson> = [];
        for (let personId = 0; personId < this.options.peopleCount; personId++) {
            const person = {
                eta: Date.now() + 10000,
                gender: personId % 3,
                id: personId,
                trail: []
            };
            for (let i = 0; i < 3; i++) {
                person.trail.push(
                    {
                        lat: this.options.startLocation.lat + Math.random() * this.options.spreadRadius,
                        lng: this.options.startLocation.lng + Math.random() * this.options.spreadRadius
                    });
            }
            people.push(person);
        }
        postMessage(people, null);
        this.timeoutId = setTimeout(() => this.movePeople(), this.options.moveDelay);
    }
}
