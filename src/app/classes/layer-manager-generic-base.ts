import { Layer } from 'leaflet';
import { LayerManagerBase } from '../classes/layer-manager-base';

export abstract class LayerManagerGenericBase<TLayer extends Layer> extends LayerManagerBase {

  protected readonly lookUp: Map<number, TLayer>;

  constructor(root?: LayerManagerBase, useRootLayerGroup?: boolean) {
    super(root, useRootLayerGroup);
    this.lookUp = new Map<number, TLayer>();
  }
}
