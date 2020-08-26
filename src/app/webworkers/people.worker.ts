/// <reference lib="webworker" />

import { PeopleWorkerLogic } from '../classes/people-worker-logic';

const logic = new PeopleWorkerLogic();

addEventListener('message', ({ data }) => {
  logic.initialize(data, (people: ArrayBuffer) => postMessage(people, [people]));
});
