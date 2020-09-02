import { LatLng, latLng, Polyline, polyline, PolylineOptions } from 'leaflet';
import { IPerson } from '../../interfaces/iperson';
import { Gender } from '../../enums/gender.enum';
import { ITrailsLayerOptions } from '../../interfaces/itrails-layer-options';
import { PeopleLayerBase } from './people-layer-base';

export class TrailsLayer extends PeopleLayerBase<Polyline, ITrailsLayerOptions> {

    public addPerson(person: IPerson): void {
        const locationLatLng = latLng(person.location);
        let options: PolylineOptions;
        switch (person.gender) {
            case Gender.FEMALE:
                options = this.options.femaleLayer;
                break;
            case Gender.MALE:
                options = this.options.maleLayer;
                break;
            case Gender.OTHER:
                options = this.options.otherLayer;
                break;
        }
        const line = polyline([locationLatLng.clone(), locationLatLng.clone()], options);
        this.addLayer(line);
        this.lookUp.set(person.id, line);
    }

    public modifyPerson(person: IPerson): void {
        const line = this.lookUp.get(person.id);
        // Check if the creation of the person was not missed because of late join.
        if (line === undefined) {
            this.addPerson(person);
            return;
        }
        const latLngs = line.getLatLngs() as LatLng[];
        if ((latLngs[latLngs.length - 2]).distanceTo(person.location) > this.options.pointMinDistance) {
            line.addLatLng(latLng(person.location).clone());
        } else {
            const lineEnd = latLngs[latLngs.length - 1];
            lineEnd.lat = person.location.lat;
            lineEnd.lng = person.location.lng;
        }
    }

    public removePerson(personId: number): void {
        const line = this.lookUp.get(personId);
        // Check if the creation of the person was not missed because of late join.
        if (line === undefined) {
            return;
        }
        this.removeLayer(line);
        line.remove();
        this.lookUp.delete(personId);
    }
}
