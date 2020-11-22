import { environment } from 'src/environments/environment';
import { WalkwaysLayer } from './walkways-layer';

describe('WalkwaysLayer', () => {
  it('should create an instance', () => {
    expect(new WalkwaysLayer(environment.view.walkways)).toBeTruthy();
  });
});
