import { PeopleSerializer } from './people-serializer';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';
import { Gender } from '../enums/gender.enum';

describe('PersonSerializer', () => {
  const peopleAll: Array<IPerson> = [];
  let idCounter = 0;
  for (let state = PersonState.ADDED; state <= PersonState.REMOVED; state++) {
    for (let gender = Gender.FEMALE; gender <= Gender.OTHER; gender++) {
      peopleAll.push({
        id: idCounter++,
        state,
        eta: idCounter * 345.3409834,
        gender,
        location: {
          lat: idCounter * 9874.12314,
          lng: idCounter * 123.34534
        }
      });
    }
  }
  const peopleAlife = peopleAll.filter(person => person.state !== PersonState.REMOVED);
  const peopleDeleted = peopleAll.filter(person => person.state === PersonState.REMOVED);
  const serializedPeopleAll = PeopleSerializer.deserialize(PeopleSerializer.serialize(peopleAll));
  const serializedPeopleAlife = serializedPeopleAll.filter(person => person.state !== PersonState.REMOVED);
  const serializedPeopleDeleted = serializedPeopleAll.filter(person => person.state === PersonState.REMOVED);

  it('should create an instance', () => {
    expect(new PeopleSerializer()).toBeTruthy();
  });

  it('should serialize array of all people', () => {
    expect(serializedPeopleAll.length)
      .toBe(peopleAll.length);
    serializedPeopleAll.forEach(person => expect(person).toBeDefined());
  });

  it('should serialize array of living people', () => {
    expect(serializedPeopleAlife.length)
      .toBe(peopleAlife.length);
    serializedPeopleAlife.forEach(person => expect(person).toBeDefined());
  });

  it('should serialize array of deleted people', () => {
    expect(serializedPeopleDeleted.length)
      .toBe(peopleDeleted.length);
    peopleDeleted.forEach(person => expect(person).toBeDefined());
  });

  it('should serialize the id of all people', () => {
    for (let i = 0; i < peopleAll.length; i++) {
      expect(serializedPeopleAll[i].id)
        .toBe(peopleAll[i].id);
    }
  });

  it('should serialize the state of all people', () => {
    for (let i = 0; i < peopleAll.length; i++) {
      expect(serializedPeopleAll[i].state)
        .toBe(peopleAll[i].state);
    }
  });

  it('should serialize the ETA of living people', () => {
    for (let i = 0; i < peopleAlife.length; i++) {
      expect(serializedPeopleAlife[i].eta)
        .toBe(peopleAlife[i].eta);
    }
  });

  it('should not serialize the ETA of deleted people', () => {
    for (let i = 0; i < peopleDeleted.length; i++) {
      expect(serializedPeopleDeleted[i].eta)
        .toBeUndefined();
    }
  });

  it('should serialize the gender of living people', () => {
    for (let i = 0; i < peopleAlife.length; i++) {
      expect(serializedPeopleAlife[i].gender)
        .toBe(peopleAlife[i].gender);
    }
  });

  it('should not serialize the gender of deleted people', () => {
    for (let i = 0; i < peopleDeleted.length; i++) {
      expect(serializedPeopleDeleted[i].gender)
        .toBeUndefined();
    }
  });

  it('should serialize the locations lat of living people', () => {
    for (let i = 0; i < peopleAlife.length; i++) {
      expect(serializedPeopleAlife[i].location.lat)
        .toBe(peopleAlife[i].location.lat);
    }
  });

  it('should serialize the locations lng of living people', () => {
    for (let i = 0; i < peopleAlife.length; i++) {
      expect(serializedPeopleAlife[i].location.lng)
        .toBe(peopleAlife[i].location.lng);
    }
  });

  it('should not serialize the location of deleted people', () => {
    for (let i = 0; i < peopleDeleted.length; i++) {
      expect(serializedPeopleDeleted[i].location)
        .toBeUndefined();
    }
  });
});
