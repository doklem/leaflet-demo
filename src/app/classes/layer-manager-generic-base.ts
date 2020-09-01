import { Layer } from 'leaflet';
import { LayerManagerBase } from '../classes/layer-manager-base';
import { ILayerManagerOptions } from '../interfaces/ilayer-manager-options';

export abstract class LayerManagerGenericBase<
  TLayer extends Layer,
  TOptions extends ILayerManagerOptions<any>> extends LayerManagerBase {

  protected readonly lookUp: Map<number, TLayer>;

  constructor(protected readonly options: TOptions) {
    super();
    this.lookUp = new Map<number, TLayer>();
  }
}
