import { IPerson } from '../interfaces/iperson';
import { PersonState } from '../enums/person-state.enum';

export class PeopleSerializer {

    private static readonly PERSON_DELETED_SIZE = 1 + 4;
    private static readonly PERSON_FULL_SIZE = PeopleSerializer.PERSON_DELETED_SIZE + 8 + 1 + 8 + 8;

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
                    eta: view.getFloat64(index + 4),
                    gender: view.getUint8(index + 12),
                    location: {
                        lat: view.getFloat64(index + 13),
                        lng: view.getFloat64(index + 21)
                    }
                });
                index += 29;
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
                view.setFloat64(index, person.eta);
                index += 8;
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
