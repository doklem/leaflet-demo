import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class PeopleSerializer {

    private static readonly PERSON_DELETED_SIZE = 1 + 4;
    private static readonly PERSON_FULL_SIZE = PeopleSerializer.PERSON_DELETED_SIZE + 4 + 1 + 8 + 8;

    public static deserialize(buffer: ArrayBuffer): Array<IPerson> {
        const people = new Array<IPerson>();
        const view = new DataView(buffer);
        let index = 0;
        let state: PersonState;
        const byteLength = buffer.byteLength;
        while (index < byteLength) {
            state = view.getUint8(index);
            index++;
            if (state === PersonState.REMOVED) {
                people.push({
                    state,
                    id: view.getUint32(index)
                });
                index += 4;
            } else {
                people.push({
                    state,
                    id: view.getUint32(index),
                    eta: view.getUint32(index + 4),
                    gender: view.getUint8(index + 8),
                    location: {
                        lat: view.getFloat64(index + 9),
                        lng: view.getFloat64(index + 17)
                    }
                });
                index += 25;
            }
        }
        return people;
    }

    public static serialize(people: Array<IPerson>): ArrayBuffer {
        let byteLength = 0;
        people.forEach(person => {
            if (person.state === PersonState.REMOVED) {
                byteLength += PeopleSerializer.PERSON_DELETED_SIZE;
            } else {
                byteLength += PeopleSerializer.PERSON_FULL_SIZE;
            }
        });
        const buffer = new ArrayBuffer(byteLength);
        const view = new DataView(buffer);
        let index = 0;
        people.forEach(person => {
            view.setUint8(index, person.state);
            index++;
            view.setUint32(index, person.id);
            index += 4;
            if (person.state !== PersonState.REMOVED) {
                view.setUint32(index, person.eta);
                index += 4;
                view.setUint8(index, person.gender);
                index++;
                view.setFloat64(index, person.location.lat);
                index += 8;
                view.setFloat64(index, person.location.lng);
                index += 8;
            }
        });
        return buffer;
    }
}
