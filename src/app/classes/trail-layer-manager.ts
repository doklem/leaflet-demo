import { LatLng, latLng, Polyline, polyline, PolylineOptions } from 'leaflet';
import { LayerManagerGenericBase } from './layer-manager-generic-base';
import { LayerManagerBase } from './layer-manager-base';
import { IPerson } from '../interfaces/iperson';
import { environment } from '../../environments/environment';
import { Gender } from '../enums/gender.enum';

export class TrailLayerManager extends LayerManagerGenericBase<Polyline> {

    constructor(root: LayerManagerBase) {
        super(root);
    }

    public addPerson(person: IPerson): void {
        this.root.addPerson(person);
        const locationLatLng = latLng(person.location);
        let options: PolylineOptions;
        switch (person.gender) {
            case Gender.FEMALE:
                options = environment.map.trails.femaleLayer;
                break;
            case Gender.MALE:
                options = environment.map.trails.maleLayer;
                break;
            case Gender.OTHER:
                options = environment.map.trails.otherLayer;
                break;
        }
        const line = polyline([locationLatLng.clone(), locationLatLng.clone()], options);
        this.layers.addLayer(line);
        this.lookUp.set(person.id, line);
    }

    public modifyPerson(person: IPerson): void {
        this.root.modifyPerson(person);
        const line = this.lookUp.get(person.id);
        // Check if the creation of the person was not missed because of late join.
        if (line === undefined) {
            this.addPerson(person);
            return;
        }
        const latLngs = line.getLatLngs() as LatLng[];
        if ((latLngs[latLngs.length - 2]).distanceTo(person.location) > environment.map.trails.pointMinDistance) {
            line.addLatLng(latLng(person.location).clone());
        } else {
            const lineEnd = latLngs[latLngs.length - 1];
            lineEnd.lat = person.location.lat;
            lineEnd.lng = person.location.lng;
        }
    }

    public removePerson(personId: number): void {
        this.root.removePerson(personId);
        const line = this.lookUp.get(personId);
        // Check if the creation of the person was not missed because of late join.
        if (line === undefined) {
            return;
        }
        this.layers.removeLayer(line);
        line.remove();
        this.lookUp.delete(personId);
    }
}
