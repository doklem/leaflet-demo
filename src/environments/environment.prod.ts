import { IEnvironment } from './../app/interfaces/ienvironment';

export const environment: IEnvironment = {
  map: {
    baseLayers: {
      maxZoom: 24,
      attribution: '...'
    },
    femalePersonLayer: {
      radius: 0.25,
      weight: 0,
      fillColor: 'red',
      fillOpacity: 1
    },
    initialZoom: 20,
    malePersonLayer: {
      radius: 0.25,
      weight: 0,
      fillColor: 'blue',
      fillOpacity: 1
    },
    otherPersonLayer: {
      radius: 0.25,
      weight: 0,
      fillColor: 'green',
      fillOpacity: 1
    },
    startLocation:
    {
      lat: 46.949,
      lng: 7.4393
    },
    trailPointMinDistance: 0.25,
    trailsEnabled: true,
    trailsLayer: {
      weight: 1,
      color: 'red',
      opacity: 0.3
    }
  },
  production: true,
  worker:
  {
    moveDelay: 100,
    peopleBatchSize: 25,
    peopleLifetimeAddition: 60000,
    peopleMinCount: 2000,
    peopleMinLifetime: 60000,
    rotationMaxRadius: 0.00025,
    rotationTime: 240000,
    spreadRadius: 0.002,
    startLocation:
    {
      lat: 46.9485,
      lng: 7.4385
    }
  }
};
