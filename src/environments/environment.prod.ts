import { IEnvironment } from './../app/interfaces/ienvironment';

export const environment: IEnvironment = {
  map: {
    baseLayers: {
      maxZoom: 24,
      attribution: '...'
    },
    initialZoom: 20,
    people: {
      femaleLayer: {
        radius: 0.25,
        weight: 0,
        fillColor: 'red',
        fillOpacity: 1
      },
      maleLayer: {
        radius: 0.25,
        weight: 0,
        fillColor: 'blue',
        fillOpacity: 1
      },
      otherLayer: {
        radius: 0.25,
        weight: 0,
        fillColor: 'green',
        fillOpacity: 1
      }
    },
    startLocation: {
      lat: 46.949,
      lng: 7.4393
    },
    trails: {
      enabled: true,
      femaleLayer: {
        weight: 1,
        color: 'red',
        opacity: 0.3
      },
      maleLayer: {
        weight: 1,
        color: 'blue',
        opacity: 0.3
      },
      otherLayer: {
        weight: 1,
        color: 'green',
        opacity: 0.3
      },
      pointMinDistance: 0.25
    }
  },
  production: true,
  worker:
  {
    moveDelay: 100,
    peopleBatchSize: 25,
    peopleAfterlifeDuration: 5000,
    peopleLifetimeAddition: 60000,
    peopleMinCount: 2000,
    peopleMinLifetime: 60000,
    rotationMinRadius: 0.000003,
    rotationRadiusAddition: 0.000247,
    rotationTime: 240000,
    spreadRadius: 0.002,
    startLocation:
    {
      lat: 46.9481,
      lng: 7.4385
    }
  }
};
