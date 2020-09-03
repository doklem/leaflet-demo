import { DotsLayer } from './dots-layer';
import { environment } from '../../../environments/environment';

describe('DotsLayer', () => {
  it('should create an instance', () => {
    expect(new DotsLayer(environment.view.dots)).toBeTruthy();
  });
});
