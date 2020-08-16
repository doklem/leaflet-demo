import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPerson } from '../interfaces/iperson';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly worker: Worker;
  private readonly subject: Subject<Array<IPerson>>;

  public readonly people$: Observable<Array<IPerson>>;

  constructor() {
    this.subject = new Subject<Array<IPerson>>();
    this.people$ = this.subject.asObservable();
    this.worker = new Worker('../webworkers/people.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.subject.next(data);
    this.worker.postMessage(environment.worker);
  }
}
