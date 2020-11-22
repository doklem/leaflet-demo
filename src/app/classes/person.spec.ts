import { Person } from './person';
import { Gender } from '../enums/gender.enum';
import { PersonState } from '../enums/person-state.enum';
import FastVector from 'fast-vector';

describe('Person', () => {
  const person = new Person(0, 0, [new FastVector(0, 0), new FastVector(1, 1)], Gender.OTHER, 1);
  it('should create an instance', () => {
    expect(person).toBeTruthy();
  });

  it('should create an instance with an empty location', () => {
    expect(person.location).toBeDefined();
    expect(person.location.lat).toBe(0);
    expect(person.location.lng).toBe(0);
  });

  it('should create an instance as added', () => {
    expect(person.state).toBe(PersonState.ADDED);
  });
});
