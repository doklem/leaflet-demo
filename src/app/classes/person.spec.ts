import { Person } from './person';
import { Gender } from '../enums/gender.enum';
import { PersonState } from '../enums/person-state.enum';

describe('Person', () => {
  const person = new Person(0, 0, Gender.OTHER, 0, { lat: 0, lng: 0 }, true, 0);
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
