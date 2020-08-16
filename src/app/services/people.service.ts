import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { latLng } from 'leaflet';
import { IPerson } from '../interfaces/iperson';
import { PeopleWorkerOptions } from '../classes/people-worker-options';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  public static readonly MOVE_DELAY = 500;
  public static readonly PEOPLE_COUNT = 250;
  private static readonly SPREAD_RADIUS = 0.01;
  public static readonly START_LOCATION = latLng(46.999995, 7.456952);

  private readonly worker: Worker;
  private readonly subject: Subject<Array<IPerson>>;

  public readonly people$: Observable<Array<IPerson>>;

  constructor() {
    this.subject = new Subject<Array<IPerson>>();
    this.people$ = this.subject.asObservable();
    this.worker = new Worker('../webworkers/people.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.subject.next(data);
    const workerOptions = new PeopleWorkerOptions();
    workerOptions.moveDelay = PeopleService.MOVE_DELAY;
    workerOptions.peopleCount = PeopleService.PEOPLE_COUNT;
    workerOptions.spreadRadius = PeopleService.SPREAD_RADIUS;
    workerOptions.startLocation = PeopleService.START_LOCATION;
    this.worker.postMessage(workerOptions);
  }
}
