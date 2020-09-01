import { LayerManagerGenericBase } from './layer-manager-generic-base';
import { Circle, CircleMarkerOptions, circle } from 'leaflet';
import { IPerson } from '../interfaces/iperson';
import { Gender } from '../enums/gender.enum';
import { ILayerManagerOptions } from '../interfaces/ilayer-manager-options';

export class PeopleLayerManager extends LayerManagerGenericBase<Circle, ILayerManagerOptions<CircleMarkerOptions>> {

    private static getPopupContent(person: IPerson): string {
        let genderText: string;
        switch (person.gender) {
            case Gender.FEMALE:
                genderText = 'female';
                break;
            case Gender.MALE:
                genderText = 'male';
                break;
            default:
                genderText = 'others';
                break;
        }
        return `<div><b>Id</b> ${person.id}</div>
      <div><b>Gender</b> ${genderText}</div>
      <div><b>ETA</b> ${new Date(person.eta).toLocaleTimeString()}</div>`;
    }

    public addPerson(person: IPerson): void {
        let options: CircleMarkerOptions;
        switch (person.gender) {
            case Gender.FEMALE:
                options = this.options.femaleLayer;
                break;
            case Gender.MALE:
                options = this.options.maleLayer;
                break;
            default:
                options = this.options.otherLayer;
                break;
        }
        const dot = circle(person.location, options);
        dot.bindPopup(PeopleLayerManager.getPopupContent(person));
        this.layers.addLayer(dot);
        this.lookUp.set(person.id, dot);
    }

    public modifyPerson(person: IPerson): void {
        const dot = this.lookUp.get(person.id);
        // Check if the creation of the person was not missed because of late join.
        if (dot === undefined) {
            this.addPerson(person);
            return;
        }
        dot.setLatLng(person.location);
    }

    public removePerson(personId: number): void {
        const dot = this.lookUp.get(personId);
        // Check if the creation of the person was not missed because of late join.
        if (dot === undefined) {
            return;
        }
        dot.closePopup();
        dot.unbindPopup();
        this.layers.removeLayer(dot);
        dot.remove();
        this.lookUp.delete(personId);
    }
}
