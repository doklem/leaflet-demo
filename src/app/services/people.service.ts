import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPerson } from '../interfaces/iperson';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly worker: Worker;
  private readonly subject: Subject<Map<number, IPerson>>;

  public readonly people$: Observable<Map<number, IPerson>>;

  constructor() {
    this.subject = new Subject<Map<number, IPerson>>();
    this.people$ = this.subject.asObservable();
    this.worker = new Worker('../webworkers/people.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => this.subject.next(data);
    this.worker.postMessage(environment.worker);
  }
}
