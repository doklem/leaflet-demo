import createGraph, { Graph } from 'ngraph.graph';
import { aStar, PathFinder } from 'ngraph.path';
import { Link, Node } from 'ngraph.graph';
import FastVector from 'fast-vector';
import { Person } from './person';
import { IPeopleWorkerOptions } from './../interfaces/ipeople-worker-options';
import { PersonState } from '../enums/person-state.enum';
import { IPerson } from '../interfaces/iperson';
import { IWaypoint } from '../interfaces/iwaypoint';
import { IWalkway } from '../interfaces/iwalkway';

export class PeopleWorkerLogic {

    private idCounter: number;
    private graph: Graph<IWaypoint, IWalkway>;
    private options: IPeopleWorkerOptions;
    private pathFinder: PathFinder<IWaypoint>;
    private people: Array<Person>;
    private readonly sendPeople: (people: Array<IPerson>) => void;
    private timeoutId: number;
    private lastRun: number;

    constructor(sendPeople: (people: Array<IPerson>) => void) {
        this.sendPeople = sendPeople;
        this.idCounter = 0;
        this.people = new Array<Person>();
        this.timeoutId = 0;
    }

    private static movePerson(person: Person, travelLength: number): void {
        if (person.journey.length === 0) {
            person.state = PersonState.REMOVED;
            person.arrivalTime = Date.now();
            return;
        }
        const nextWaypoint = person.journey[0];
        const distanceToWaypoint = person.position.distance(nextWaypoint);
        if (distanceToWaypoint < 0.00001 || travelLength >= distanceToWaypoint) {
            person.journey.shift();
            this.movePerson(person, travelLength);
            return;
        }
        const direction = new FastVector(nextWaypoint.x - person.position.x, nextWaypoint.y - person.position.y).normalize();
        const travel = direction.mul(travelLength);
        person.position = person.position.add(travel);
        person.state = PersonState.MODIFIED;
    }

    public initialize(options: IPeopleWorkerOptions): void {
        this.options = options;
        this.loadGraph();
        this.lastRun = Date.now();
        for (let i = 0; i < this.options.peopleMinCount; i++) {
            this.people.push(this.createPerson(true));
        }
        this.movePeople();
    }

    private createJourny(anyStart?: boolean): Array<FastVector> {
        let start: IWaypoint;
        let endPoints: Array<IWaypoint>;
        if (anyStart === true) {
            start = this.options.waypoints[Math.round(((this.options.waypoints.length - 1) * Math.random()))];
            endPoints = this.options.waypoints.filter(point => point.id !== start.id && point.entranceGroup !== undefined);
        } else {
            const entryPoints = this.options.waypoints.filter(point => point.entranceGroup !== undefined);
            start = entryPoints[Math.round(((entryPoints.length - 1) * Math.random()))];
            endPoints = this.options.waypoints
                .filter(point => point.entranceGroup !== undefined && point.entranceGroup !== start.entranceGroup);
        }
        const end = endPoints[Math.round(((endPoints.length - 1) * Math.random()))];
        const path = this.pathFinder.find(end.id, start.id);
        let lng: number;
        let lat: number;
        let diameter: number;
        return path.map(node => {
            diameter = node.data.radius * 2;
            lng = node.data.location.lng + (((Math.random() * diameter) - node.data.radius) * 0.00001);
            lat = node.data.location.lat + (((Math.random() * diameter) - node.data.radius) * 0.00001);
            return new FastVector(lng, lat);
        });
    }

    private createPerson(anyStart?: boolean): Person {
        return new Person(
            Date.now(),
            this.idCounter++,
            this.createJourny(anyStart),
            this.idCounter % 3,
            (0.75 + Math.random()) * 0.0000001);
    }

    private loadGraph(): void {
        this.graph = createGraph<IWaypoint, IWalkway>();
        this.options.waypoints
            .forEach(waypoint => this.graph.addNode(waypoint.id, waypoint));
        let walkway: IWalkway;
        this.options.waypoints
            .forEach(waypoint =>
                waypoint.connections?.forEach(waypointId => {
                    walkway = {
                        end: this.options.waypoints.find(otherWaypoint => otherWaypoint.id === waypointId).location,
                        start: waypoint.location
                    };
                    walkway.distance = new FastVector(walkway.start.lat, walkway.start.lng)
                        .distance(new FastVector(walkway.end.lat, walkway.end.lng));
                    this.graph.addLink(waypoint.id, waypointId, walkway);
                }));
        this.pathFinder = aStar(this.graph, {
            distance(from: Node<IWaypoint>, to: Node<IWaypoint>, link: Link<IWalkway>): number {
                return link.data.distance;
            }
        });
    }

    private movePeople(): void {
        clearTimeout(this.timeoutId);
        let activePeopleCount = 0;

        // Get the fraction of seconds, which past since the last run
        const now = Date.now();
        const timeFactor = 1000 / (now - this.lastRun);
        this.lastRun = now;
        this.people.forEach(person => {
            // Ignore people, which are in their afterlife
            if (person.state === PersonState.REMOVED) {
                return;
            }
            PeopleWorkerLogic.movePerson(person, person.speed * timeFactor);
            if (person.state === PersonState.MODIFIED) {
                activePeopleCount++;
            }
        });
        // Add new people, if there are too few
        if (activePeopleCount < this.options.peopleMinCount) {
            for (let i = 0; i < this.options.peopleBatchSize; i++) {
                this.people.push(this.createPerson());
            }
        }
        this.sendPeople(this.people);
        // Remove people, which have reached the end of their afterlife.
        const deleteThreshold = now - this.options.peopleAfterlifeDuration;
        this.people = this.people.filter(person => person.state !== PersonState.REMOVED || person.arrivalTime < deleteThreshold);
        this.timeoutId = setTimeout(() => this.movePeople(), this.options.moveDelay);
    }
}
