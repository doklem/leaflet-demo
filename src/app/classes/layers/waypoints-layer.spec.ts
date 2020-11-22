import { environment } from 'src/environments/environment';
import { WaypointsLayer } from './waypoints-layer';

describe('WaypointsLayer', () => {
  it('should create an instance', () => {
    expect(new WaypointsLayer(environment.view.waypoints)).toBeTruthy();
  });
});
