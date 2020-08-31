import { PerformanceMeasuringLayerUpdater } from './performance-measuring-layer-updater';
import { PersonState } from '../enums/person-state.enum';
import { IPerson } from '../interfaces/iperson';
import { LayerManagerBase } from './layer-manager-base';

describe('PerformanceMeasuringLayerUpdater', () => {

  function createLayerManagerMock(): LayerManagerBase {
    return {
      layers: null,
      addPerson: (person: IPerson) => { },
      modifyPerson: (person: IPerson) => { },
      removePerson: (personId: number) => { }
    };
  }

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
    expect(new PerformanceMeasuringLayerUpdater()).toBeTruthy();
  });

  it('should call addPerson with new person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'addPerson');
    updater.updatePeople(newPeople);
    expect(layerManagerMock.addPerson).toHaveBeenCalled();
  });

  it('should not call modifyPerson with new person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'modifyPerson');
    updater.updatePeople(newPeople);
    expect(layerManagerMock.modifyPerson).toHaveBeenCalledTimes(0);
  });

  it('should not call removePerson with new person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'removePerson');
    updater.updatePeople(newPeople);
    expect(layerManagerMock.removePerson).toHaveBeenCalledTimes(0);
  });

  it('should not call addPerson with modified person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'addPerson');
    updater.updatePeople(modifiedPeople);
    expect(layerManagerMock.addPerson).toHaveBeenCalledTimes(0);
  });

  it('should call modifyPerson with modified person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'modifyPerson');
    updater.updatePeople(modifiedPeople);
    expect(layerManagerMock.modifyPerson).toHaveBeenCalled();
  });

  it('should not call removePerson with modified person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'removePerson');
    updater.updatePeople(modifiedPeople);
    expect(layerManagerMock.removePerson).toHaveBeenCalledTimes(0);
  });

  it('should not call addPerson with deleted person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'addPerson');
    updater.updatePeople(deletedPeople);
    expect(layerManagerMock.addPerson).toHaveBeenCalledTimes(0);
  });

  it('should not call modifyPerson with deleted person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'modifyPerson');
    updater.updatePeople(deletedPeople);
    expect(layerManagerMock.modifyPerson).toHaveBeenCalledTimes(0);
  });

  it('should call removePerson with deleted person', () => {
    const updater = new PerformanceMeasuringLayerUpdater();
    const layerManagerMock = createLayerManagerMock();
    updater.addManager(layerManagerMock);
    spyOn(layerManagerMock, 'removePerson');
    updater.updatePeople(deletedPeople);
    expect(layerManagerMock.removePerson).toHaveBeenCalled();
  });
});
