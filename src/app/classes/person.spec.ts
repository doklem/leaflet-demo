import { Person } from './person';
import { Gender } from '../enums/gender.enum';

describe('Person', () => {
  it('should create an instance', () => {
    expect(new Person(0, 0, Gender.OTHER, 0, { lat: 0, lng: 0 }, true, 0)).toBeTruthy();
  });
});
