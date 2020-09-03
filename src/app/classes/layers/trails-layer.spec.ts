import { TrailsLayer } from './trails-layer';
import { environment } from '../../../environments/environment';

describe('TrailsLayer', () => {
  it('should create an instance', () => {
    expect(new TrailsLayer(environment.view.trails)).toBeTruthy();
  });
});
