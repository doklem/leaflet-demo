import { IPerson } from './iperson';

export interface IPeopleLayer {

    addPerson(person: IPerson): void;

    modifyPerson(person: IPerson): void;

    removePerson(personId: number): void;
}
