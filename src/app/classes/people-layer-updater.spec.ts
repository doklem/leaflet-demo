import { PeopleLayerUpdater } from './people-layer-updater';
import { PerformanceMeasuringPeopleLayerUpdater } from './performance-measuring-people-layer-updater';
import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';
import { IPeopleLayer } from '../interfaces/ipeople-layer';

function createPeopleLayerMock(): IPeopleLayer {
  return {
    addPerson: (person: IPerson) => { },
    modifyPerson: (person: IPerson) => { },
    removePerson: (personId: number) => { }
  };
}

function testPeopleLayerUpdaters<TUpdater extends PeopleLayerUpdater>(createUpdater: () => TUpdater): void {
  const newPeople = [{
    id: 0,
    state: PersonState.ADDED
  }];

  const modifiedPeople = [{
    id: 0,
    state: PersonState.MODIFIED
  }];

  const deletedPeople = [{
    id: 0,
    state: PersonState.REMOVED
  }];

  it('should create an instance', () => {
    expect(createUpdater()).toBeTruthy();
  });

  it('should return the same layer manager', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    expect(updater.addLayerGroup(layerMock)).toEqual(layerMock);
  });

  it('should call addPerson with new person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'addPerson');
    updater.updatePeople(newPeople);
    expect(layerMock.addPerson).toHaveBeenCalled();
  });

  it('should not call modifyPerson with new person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'modifyPerson');
    updater.updatePeople(newPeople);
    expect(layerMock.modifyPerson).toHaveBeenCalledTimes(0);
  });

  it('should not call removePerson with new person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'removePerson');
    updater.updatePeople(newPeople);
    expect(layerMock.removePerson).toHaveBeenCalledTimes(0);
  });

  it('should not call addPerson with modified person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'addPerson');
    updater.updatePeople(modifiedPeople);
    expect(layerMock.addPerson).toHaveBeenCalledTimes(0);
  });

  it('should call modifyPerson with modified person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'modifyPerson');
    updater.updatePeople(modifiedPeople);
    expect(layerMock.modifyPerson).toHaveBeenCalled();
  });

  it('should not call removePerson with modified person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'removePerson');
    updater.updatePeople(modifiedPeople);
    expect(layerMock.removePerson).toHaveBeenCalledTimes(0);
  });

  it('should not call addPerson with deleted person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'addPerson');
    updater.updatePeople(deletedPeople);
    expect(layerMock.addPerson).toHaveBeenCalledTimes(0);
  });

  it('should not call modifyPerson with deleted person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'modifyPerson');
    updater.updatePeople(deletedPeople);
    expect(layerMock.modifyPerson).toHaveBeenCalledTimes(0);
  });

  it('should call removePerson with deleted person', () => {
    const updater = createUpdater();
    const layerMock = createPeopleLayerMock();
    updater.addLayerGroup(layerMock);
    spyOn(layerMock, 'removePerson');
    updater.updatePeople(deletedPeople);
    expect(layerMock.removePerson).toHaveBeenCalled();
  });
}

describe('PeopleLayerUpdater', () => {
  testPeopleLayerUpdaters(() => new PeopleLayerUpdater());
});

describe('PerformanceMeasuringPeopleLayerUpdater', () => {
  testPeopleLayerUpdaters(() => new PerformanceMeasuringPeopleLayerUpdater());
});
