import { TrailLayerManager } from './trail-layer-manager';
import { environment } from '../../environments/environment';

describe('TrailLayerManager', () => {
  it('should create an instance', () => {
    expect(new TrailLayerManager(environment.map.trails)).toBeTruthy();
  });
});
