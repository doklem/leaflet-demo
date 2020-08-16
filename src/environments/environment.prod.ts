import { IEnvironment } from './../app/interfaces/ienvironment';

export const environment: IEnvironment = {
  map: {
    baseLayers: {
      maxZoom: 19,
      attribution: '...'
    },
    femalePersonLayer: {
      radius: 5,
      weight: 0,
      fillColor: 'pink',
      fillOpacity: 0.6
    },
    initialZoom: 17,
    malePersonLayer: {
      radius: 5,
      weight: 0,
      fillColor: 'blue',
      fillOpacity: 0.6
    },
    otherPersonLayer: {
      radius: 5,
      weight: 0,
      fillColor: 'green',
      fillOpacity: 0.6
    },
    startLocation:
    {
      lat: 46.999,
      lng: 7.457
    },
    trailsLayer: {
      weight: 1,
      color: 'red',
      opacity: 0.3
    }
  },
  production: true,
  worker:
  {
    moveDelay: 500,
    peopleCount: 250,
    spreadRadius: 0.01,
    startLocation:
    {
      lat: 46.994,
      lng: 7.452
    }
  }
};
