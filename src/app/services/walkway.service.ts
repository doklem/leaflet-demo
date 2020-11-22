import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IWalkway } from '../interfaces/iwalkway';
import { IWaypoint } from '../interfaces/iwaypoint';

@Injectable({
  providedIn: 'root'
})
export class WalkwayService {

  private readonly ways: Array<IWalkway>;

  constructor() {
    this.ways = [];
    let end: IWaypoint;
    environment.worker.waypoints
      .forEach(waypoint => waypoint.connections?.forEach(otherWaypointId => {
        end = environment.worker.waypoints.find(otherWaypoint => otherWaypointId === otherWaypoint.id);
        if (end === undefined) {
          throw new Error('Unable to find the waypoint with the ID \'' + otherWaypointId + '\' which is specified by \'' + waypoint.id + '\' as connection.');
        }
        this.ways.push({
          start: waypoint.location,
          end: end.location
        });
      }));
  }

  public get walkways(): Array<IWalkway> {
    return this.ways;
  }
}
