import { Layer, LayerGroup } from 'leaflet';
import { IPerson } from '../../interfaces/iperson';
import { IPeopleLayer } from '../../interfaces/ipeople-layer';
import { IPeopleLayerOptions } from '../../interfaces/ipeople-layer-options';

export abstract class PeopleLayerBase<TLayer extends Layer, TOptions extends IPeopleLayerOptions<any>>
    extends LayerGroup
    implements IPeopleLayer {

    protected readonly lookUp: Map<number, TLayer>;

    constructor(protected readonly options: TOptions) {
        super([], options);
        this.lookUp = new Map<number, TLayer>();
    }

    public abstract addPerson(person: IPerson): void;

    public abstract modifyPerson(person: IPerson): void;

    public abstract removePerson(personId: number): void;
}
