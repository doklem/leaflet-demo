import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { latLng } from 'leaflet';
import { IPerson } from '../interfaces/iperson';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  public static readonly MOVE_DELAY = 500;
  public static readonly PEOPLE_COUNT = 250;
  private static readonly SPREAD_RADIUS = 0.01;
  public static readonly START_LOCATION = latLng(46.999995, 7.456952);

  private readonly subject: Subject<Array<IPerson>>;

  private timeoutId: number;

  public readonly people$: Observable<Array<IPerson>>;

  constructor() {
    this.timeoutId = 0;
    this.subject = new Subject<Array<IPerson>>();
    this.people$ = this.subject.asObservable();
    this.sendPeople();
  }

  private sendPeople(): void {
    clearTimeout(this.timeoutId);
    const people: Array<IPerson> = [];
    for (let personId = 0; personId < PeopleService.PEOPLE_COUNT; personId++) {
      const person = {
        eta: Date.now() + 10000,
        gender: personId % 3,
        id: personId,
        trail: []
      };
      for (let i = 0; i < 3; i++) {
        person.trail.push(
          {
            lat: PeopleService.START_LOCATION.lat + Math.random() * PeopleService.SPREAD_RADIUS,
            lng: PeopleService.START_LOCATION.lng + Math.random() * PeopleService.SPREAD_RADIUS
          });
      }
      people.push(person);
    }
    this.subject.next(people);
    this.timeoutId = setTimeout(() => this.sendPeople(), PeopleService.MOVE_DELAY);
  }
}
