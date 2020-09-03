import { IEnvironment } from './../app/interfaces/ienvironment';

export const environment: IEnvironment = {
  production: true,
  view: {
    baseLayers: [{
      layer: {
        maxNativeZoom: 22,
        maxZoom: 24,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="http://opendatacommons.org/licenses/odbl/summary/">ODbL 1.0</a>, Other contents &copy; Swiss OpenStreetMap Association, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      },
      title: 'Swiss Open Street Map',
      url: 'https://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png'
    }, {
      layer: {
        maxNativeZoom: 18,
        maxZoom: 24,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      },
      title: 'Open Street Map',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }],
    map: {
      center: {
        lat: 46.949,
        lng: 7.4393
      },
      maxZoom: 24,
      zoom: 20
    },
    dots: {
      enabled: true,
      femaleLayer: {
        radius: 0.25,
        weight: 0,
        fillColor: 'red',
        fillOpacity: 1
      },
      initialVisible: true,
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
      },
      title: 'People'
    },
    trails: {
      enabled: true,
      femaleLayer: {
        weight: 1,
        color: 'red',
        opacity: 0.3
      },
      initialVisible: false,
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
      pointMinDistance: 0.25,
      title: 'Trails'
    }
  },
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
