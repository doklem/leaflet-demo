/// <reference lib="webworker" />

import { PeopleWorkerLogic } from '../classes/people-worker-logic';
import { IPerson } from '../interfaces/iperson';
import { PeopleSerializer } from '../classes/people-serializer';

function sendPeople(people: Array<IPerson>): void {
  const buffer = PeopleSerializer.serialize(people);
  postMessage(buffer, [buffer]);
}

const logic = new PeopleWorkerLogic(sendPeople);

function handleMessage(data): void {
  logic.initialize(data);
}

addEventListener('message', ({ data }) => handleMessage(data));
