import { PeopleWorkerLogic } from './people-worker-logic';
import { IPerson } from '../interfaces/iperson';

describe('PeopleWorkerLogic', () => {
  it('should create an instance', () => {
    expect(new PeopleWorkerLogic((people: Array<IPerson>) => { })).toBeTruthy();
  });
});
