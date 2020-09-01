import { PeopleLayerManager } from './people-layer-manager';
import { environment } from '../../environments/environment';

describe('PeopleLayerManager', () => {
  it('should create an instance', () => {
    expect(new PeopleLayerManager(environment.map.people)).toBeTruthy();
  });
});
