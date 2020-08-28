import { IEnvironment } from './../app/interfaces/ienvironment';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  map: {
    baseLayers: {
      maxZoom: 20,
      attribution: '...'
    },
    femalePersonLayer: {
      radius: 0.5,
      weight: 0,
      fillColor: 'red',
      fillOpacity: 1
    },
    initialZoom: 18,
    malePersonLayer: {
      radius: 0.5,
      weight: 0,
      fillColor: 'blue',
      fillOpacity: 1
    },
    otherPersonLayer: {
      radius: 0.5,
      weight: 0,
      fillColor: 'green',
      fillOpacity: 1
    },
    startLocation:
    {
      lat: 46.949,
      lng: 7.439
    },
    trailPointMinDistance: 0.5,
    trailsEnabled: true,
    trailsLayer: {
      weight: 1,
      color: 'red',
      opacity: 0.3
    }
  },
  production: false,
  worker:
  {
    moveDelay: 100,
    peopleBatchSize: 25,
    peopleLifetimeAddition: 60000,
    peopleMinCount: 2000,
    peopleMinLifetime: 60000,
    rotationMaxRadius: 0.0005,
    rotationTime: 240000,
    spreadRadius: 0.001,
    startLocation:
    {
      lat: 46.9485,
      lng: 7.4385
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
