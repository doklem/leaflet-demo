import { IEnvironment } from './../app/interfaces/ienvironment';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnvironment = {
  production: false,
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
        layers: 'luftbild_2020',
        maxNativeZoom: 20,
        maxZoom: 24,
        attribution: '&copy; <a href="https://www.bern.ch/open-government-data-ogd">Geodaten Stadt Bern</a>'
      },
      title: 'Satellite',
      url: 'https://map.bern.ch/wms/OpenData/proxy.php?'
    }, {
      layer: {
        layers: 'GEODB.LDOM50CM_LORELIEF_STANDARD',
        maxNativeZoom: 20,
        maxZoom: 24,
        attribution: '&copy; <a href="https://www.be.ch/geoportal">Amt für Geoinformation des Kantons Bern</a>'
      },
      title: 'LIDAR',
      url: 'https://www.geoservice.apps.be.ch/geoservice2/services/a42geo/a42geo_hoehenwms_d_fk/MapServer/WMSServer?'
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
      zoom: 19
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
      enabled: false,
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
    },
    walkways: {
      enabled: true,
      initialVisible: false,
      weight: 2,
      color: 'red',
      opacity: 0.5,
      title: 'Walkways'
    },
    waypoints: {
      enabled: true,
      initialVisible: false,
      weight: 0,
      fillColor: 'red',
      fillOpacity: 0.5,
      title: 'Waypoints'
    }
  },
  worker:
  {
    moveDelay: 100,
    peopleBatchSize: 5,
    peopleAfterlifeDuration: 10000,
    peopleMinCount: 5000,
    waypoints: [
      {
        id: 'Baldachin, elevator',
        entranceGroup: 'Baldachin',
        location: { lat: 46.94807, lng: 7.44038 },
        radius: 2,
        connections: ['Baldachin, underground, north']
      },
      {
        id: 'Baldachin, escalator A, heigh',
        entranceGroup: 'Baldachin',
        location: { lat: 46.94784, lng: 7.44044 },
        radius: 2,
        connections: ['Baldachin, escalator A, low']
      },
      {
        id: 'Baldachin, escalator A, low',
        location: { lat: 46.94796, lng: 7.44038 },
        radius: 2,
        connections: ['Baldachin, underground, north']
      },
      {
        id: 'Baldachin, escalator B, heigh',
        entranceGroup: 'Baldachin',
        location: { lat: 46.94783, lng: 7.44040 },
        radius: 2,
        connections: ['Baldachin, escalator B, low']
      },
      {
        id: 'Baldachin, escalator B, low',
        location: { lat: 46.94795, lng: 7.44034 },
        radius: 2,
        connections: ['Baldachin, underground, north']
      },
      {
        id: 'Baldachin, escalator C, heigh',
        entranceGroup: 'Baldachin',
        location: { lat: 46.94741, lng: 7.44052 },
        radius: 2,
        connections: ['Baldachin, escalator C, low']
      },
      {
        id: 'Baldachin, escalator C, low',
        location: { lat: 46.94752, lng: 7.44040 },
        radius: 2,
        connections: ['Baldachin, underground, south']
      },
      {
        id: 'Baldachin, escalator D, heigh',
        entranceGroup: 'Baldachin',
        location: { lat: 46.94746, lng: 7.44064 },
        radius: 2,
        connections: ['Baldachin, escalator D, low']
      },
      {
        id: 'Baldachin, escalator D, low',
        location: { lat: 46.94757, lng: 7.44052 },
        radius: 2,
        connections: ['Baldachin, underground, south']
      },
      {
        id: 'Baldachin, underground, north',
        location: { lat: 46.94804, lng: 7.44025 },
        radius: 7,
        connections: ['mainbuilding, Baldachin entrance']
      },
      {
        id: 'Baldachin, underground, south',
        location: { lat: 46.94768, lng: 7.44037 },
        radius: 7,
        connections: ['Baldachin, underground, north']
      },
      {
        id: 'passage east, escalator A, heigh',
        entranceGroup: 'passage east',
        location: { lat: 46.94920, lng: 7.44082 },
        radius: 0.5,
        connections: ['passage east, escalator A, low']
      },
      {
        id: 'passage east, escalator A, low',
        location: { lat: 46.94918, lng: 7.44071 },
        radius: 0.5,
        connections: ['passage east']
      },
      {
        id: 'passage east, stairs, heigh',
        entranceGroup: 'passage east',
        location: { lat: 46.94918, lng: 7.44083 },
        radius: 1.5,
        connections: ['passage east, stairs, low']
      },
      {
        id: 'passage east, stairs, low',
        location: { lat: 46.94916, lng: 7.44072 },
        radius: 1.5,
        connections: ['passage east']
      },
      {
        id: 'passage east, escalator B, heigh',
        entranceGroup: 'passage east',
        location: { lat: 46.94917, lng: 7.44084 },
        radius: 0.5,
        connections: ['passage east, escalator B, low']
      },
      {
        id: 'passage east, escalator B, low',
        location: { lat: 46.94915, lng: 7.44072 },
        radius: 0.5,
        connections: ['passage east']
      },
      {
        id: 'passage east',
        location: { lat: 46.94915, lng: 7.44064 },
        radius: 5,
        connections: ['mainbuilding, passage east']
      },
      {
        id: 'mainbuilding, passage east',
        location: { lat: 46.94908, lng: 7.44027 },
        radius: 5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, Baldachin entrance',
        location: { lat: 46.94838, lng: 7.44016 },
        radius: 10,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance north, escalator A, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94916, lng: 7.43989 },
        radius: 0.5,
        connections: ['mainbuilding, entrance north, escalator A, low']
      },
      {
        id: 'mainbuilding, entrance north, escalator A, low',
        location: { lat: 46.94907, lng: 7.43992 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance north, escalator B, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94917, lng: 7.43987 },
        radius: 0.5,
        connections: ['mainbuilding, entrance north, escalator B, low']
      },
      {
        id: 'mainbuilding, entrance north, escalator B, low',
        location: { lat: 46.94907, lng: 7.43990 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, escalator A, low',
        location: { lat: 46.94884, lng: 7.44008 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, escalator A, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94871, lng: 7.44014 },
        radius: 0.5,
        connections: ['mainbuilding, entrance south, escalator A, low']
      },
      {
        id: 'mainbuilding, entrance south, escalator B, low',
        location: { lat: 46.94884, lng: 7.44006 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, escalator B, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94871, lng: 7.44011 },
        radius: 0.5,
        connections: ['mainbuilding, entrance south, escalator B, low']
      },
      {
        id: 'mainbuilding, entrance south, escalator C, low',
        location: { lat: 46.94882, lng: 7.43992 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, escalator C, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94868, lng: 7.43997 },
        radius: 0.5,
        connections: ['mainbuilding, entrance south, escalator C, low']
      },
      {
        id: 'mainbuilding, entrance south, escalator D, low',
        location: { lat: 46.94881, lng: 7.43990 },
        radius: 0.5,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, escalator D, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94868, lng: 7.43995 },
        radius: 0.5,
        connections: ['mainbuilding, entrance south, escalator D, low']
      },
      {
        id: 'mainbuilding, entrance south, stairs A, low',
        location: { lat: 46.94883, lng: 7.44002 },
        radius: 1,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, stairs A, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94870, lng: 7.44007 },
        radius: 1,
        connections: ['mainbuilding, entrance south, stairs A, low']
      },
      {
        id: 'mainbuilding, entrance south, stairs B, low',
        location: { lat: 46.94882, lng: 7.43997 },
        radius: 1,
        connections: ['mainbuilding, central court']
      },
      {
        id: 'mainbuilding, entrance south, stairs B, heigh',
        entranceGroup: 'mainbuilding',
        location: { lat: 46.94869, lng: 7.44002 },
        radius: 1,
        connections: ['mainbuilding, entrance south, stairs B, low']
      },
      {
        id: 'mainbuilding, central court',
        location: { lat: 46.94898, lng: 7.43992 },
        radius: 10,
        connections: ['mainbuilding, entrance passage west']
      },
      {
        id: 'mainbuilding, entrance passage west',
        location: {
          lat: 46.94893,
          lng: 7.43965
        },
        radius: 7,
        connections: ['passage west, curve']
      },
      {
        id: 'passage west, curve',
        location: {
          lat: 46.94888,
          lng: 7.43935
        },
        radius: 7,
        connections: ['passage west, platform 1']
      },
      {
        id: 'passage west, platform 1, east ramp, heigh',
        location: { lat: 46.94906, lng: 7.43930 },
        radius: 2,
        connections: [
          'passage west, platform 1, east ramp, low',
          'platform 1, sector D']
      },
      {
        id: 'passage west, platform 1, east ramp, low',
        location: { lat: 46.94900, lng: 7.43920 },
        radius: 2,
        connections: ['passage west, platform 1']
      },
      {
        id: 'passage west, platform 1',
        location: { lat: 46.94894, lng: 7.43909 },
        radius: 7,
        connections: ['passage west, platform 1, west ramp, low']
      },
      {
        id: 'passage west, platform 1, west ramp, low',
        location: { lat: 46.94888, lng: 7.43899 },
        radius: 2,
        connections: ['passage west, platform 1, west ramp, heigh']
      },
      {
        id: 'passage west, platform 1, west ramp, heigh',
        location: { lat: 46.94883, lng: 7.43890 },
        radius: 2,
        connections: ['platform 1, sector E']
      },
      {
        id: 'passage west, platform 2, east ramp, heigh',
        location: { lat: 46.94916, lng: 7.43916 },
        radius: 2,
        connections: [
          'passage west, platform 2, east ramp, low',
          'platform 2, sector D']
      },
      {
        id: 'passage west, platform 2, east ramp, low',
        location: { lat: 46.94911, lng: 7.43906 },
        radius: 2,
        connections: ['passage west, platform 2']
      },
      {
        id: 'passage west, platform 2',
        location: { lat: 46.94905, lng: 7.43895 },
        radius: 7,
        connections: [
          'passage west, platform 1',
          'passage west, platform 2, west ramp, low']
      },
      {
        id: 'passage west, platform 2, west ramp, low',
        location: { lat: 46.94898, lng: 7.43885 },
        radius: 2,
        connections: ['passage west, platform 2, west ramp, heigh']
      },
      {
        id: 'passage west, platform 2, west ramp, heigh',
        location: { lat: 46.94893, lng: 7.43874 },
        radius: 2,
        connections: ['platform 2, sector E']
      },
      {
        id: 'passage west, platform 3, east ramp, heigh',
        location: { lat: 46.94927, lng: 7.43900 },
        radius: 2,
        connections: [
          'passage west, platform 3, east ramp, low',
          'platform 3, sector D']
      },
      {
        id: 'passage west, platform 3, east ramp, low',
        location: { lat: 46.94922, lng: 7.43890 },
        radius: 2,
        connections: ['passage west, platform 3']
      },
      {
        id: 'passage west, platform 3',
        location: { lat: 46.94916, lng: 7.43881 },
        radius: 7,
        connections: [
          'passage west, platform 2',
          'passage west, platform 3, west ramp, low']
      },
      {
        id: 'passage west, platform 3, west ramp, low',
        location: { lat: 46.94911, lng: 7.43869 },
        radius: 2,
        connections: ['passage west, platform 3, west ramp, heigh']
      },
      {
        id: 'passage west, platform 3, west ramp, heigh',
        location: { lat: 46.94904, lng: 7.43858 },
        radius: 2,
        connections: ['platform 3, sector E']
      },
      {
        id: 'passage west, platform 4, east ramp, heigh',
        location: { lat: 46.94939, lng: 7.43884 },
        radius: 2,
        connections: [
          'passage west, platform 4, east ramp, low',
          'platform 4, sector D']
      },
      {
        id: 'passage west, platform 4, east ramp, low',
        location: { lat: 46.94934, lng: 7.43875 },
        radius: 2,
        connections: ['passage west, platform 4']
      },
      {
        id: 'passage west, platform 4',
        location: { lat: 46.94927, lng: 7.43864 },
        radius: 7,
        connections: [
          'passage west, platform 3',
          'passage west, platform 4, west ramp, low']
      },
      {
        id: 'passage west, platform 4, west ramp, low',
        location: { lat: 46.94922, lng: 7.43854 },
        radius: 2,
        connections: ['passage west, platform 4, west ramp, heigh']
      },
      {
        id: 'passage west, platform 4, west ramp, heigh',
        location: { lat: 46.94916, lng: 7.43842 },
        radius: 2,
        connections: ['platform 4, sector E']
      },
      {
        id: 'passage west, platform 5, east ramp, heigh',
        location: { lat: 46.94949, lng: 7.43869 },
        radius: 2,
        connections: [
          'passage west, platform 5, east ramp, low',
          'platform 5, sector D']
      },
      {
        id: 'passage west, platform 5, east ramp, low',
        location: { lat: 46.94944, lng: 7.43858 },
        radius: 2,
        connections: ['passage west, platform 5']
      },
      {
        id: 'passage west, platform 5',
        location: { lat: 46.94939, lng: 7.43847 },
        radius: 7,
        connections: [
          'passage west, platform 4',
          'passage west, platform 5, west ramp, low']
      },
      {
        id: 'passage west, platform 5, west ramp, low',
        location: { lat: 46.94935, lng: 7.43839 },
        radius: 2,
        connections: ['passage west, platform 5, west ramp, heigh']
      },
      {
        id: 'passage west, platform 5, west ramp, heigh',
        location: { lat: 46.94929, lng: 7.43828 },
        radius: 2,
        connections: ['platform 5, sector E']
      },
      {
        id: 'passage west, platform 6, east ramp, heigh',
        location: { lat: 46.94962, lng: 7.43848 },
        radius: 2,
        connections: [
          'passage west, platform 6, east ramp, low',
          'platform 6, sector D']
      },
      {
        id: 'passage west, platform 6, east ramp, low',
        location: { lat: 46.94957, lng: 7.43839 },
        radius: 2,
        connections: ['passage west, platform 6']
      },
      {
        id: 'passage west, platform 6',
        location: { lat: 46.94952, lng: 7.43828 },
        radius: 7,
        connections: [
          'passage west, platform 5',
          'passage west, platform 6, west ramp, low']
      },
      {
        id: 'passage west, platform 6, west ramp, low',
        location: { lat: 46.94946, lng: 7.43819 },
        radius: 2,
        connections: ['passage west, platform 6, west ramp, heigh']
      },
      {
        id: 'passage west, platform 6, west ramp, heigh',
        location: { lat: 46.94942, lng: 7.43811 },
        radius: 2,
        connections: ['platform 6, sector E']
      },
      {
        id: 'passage west, stairs entrance',
        entranceGroup: 'passage west',
        location: { lat: 46.94963, lng: 7.43824 },
        radius: 1,
        connections: ['passage west, platform 6']
      },
      {
        id: 'passage west, elevator A entrance',
        entranceGroup: 'passage west',
        location: { lat: 46.94962, lng: 7.43822 },
        radius: 1,
        connections: ['passage west, platform 6']
      },
      {
        id: 'passage west, elevator B entrance',
        entranceGroup: 'passage west',
        location: { lat: 46.94961, lng: 7.43819 },
        radius: 1,
        connections: ['passage west, platform 6']
      },
      {
        id: 'passage west, elevator C entrance',
        entranceGroup: 'passage west',
        location: { lat: 46.94960, lng: 7.43816 },
        radius: 1,
        connections: ['passage west, platform 6']
      },
      {
        id: 'platform 1, sector A',
        entranceGroup: 'platform 1',
        location: { lat: 46.94980, lng: 7.43995 },
        radius: 4,
        connections: ['platform 1, sector B']
      },
      {
        id: 'platform 1, sector B',
        entranceGroup: 'platform 1',
        location: { lat: 46.94956, lng: 7.43984 },
        radius: 4,
        connections: ['platform 1, sector C']
      },
      {
        id: 'platform 1, sector C',
        entranceGroup: 'platform 1',
        location: { lat: 46.94934, lng: 7.43966 },
        radius: 4,
        connections: ['platform 1, sector D']
      },
      {
        id: 'platform 1, sector D',
        entranceGroup: 'platform 1',
        location: { lat: 46.94914, lng: 7.43940 },
        radius: 4
      },
      {
        id: 'platform 1, sector E',
        entranceGroup: 'platform 1',
        location: { lat: 46.94873, lng: 7.43872 },
        radius: 4,
        connections: ['platform 1, sector F']
      },
      {
        id: 'platform 1, sector F',
        entranceGroup: 'platform 1',
        location: { lat: 46.94862, lng: 7.43847 },
        radius: 4,
        connections: ['platform 1, sector G']
      },
      {
        id: 'platform 1, sector G',
        entranceGroup: 'platform 1',
        location: { lat: 46.94852, lng: 7.43820 },
        radius: 4,
        connections: ['platform 1, sector H']
      },
      {
        id: 'platform 1, sector H',
        entranceGroup: 'platform 1',
        location: { lat: 46.94843, lng: 7.43790 },
        radius: 4,
        connections: ['platform 1, sector I']
      },
      {
        id: 'platform 1, sector I',
        entranceGroup: 'platform 1',
        location: { lat: 46.94830, lng: 7.43743 },
        radius: 4,
        connections: ['Wave, platform 1, escalator east, low']
      },
      {
        id: 'platform 1, sector J',
        entranceGroup: 'platform 1',
        location: { lat: 46.94805, lng: 7.43614 },
        radius: 3,
        connections: ['platform 1, sector K']
      },
      {
        id: 'platform 1, sector K',
        entranceGroup: 'platform 1',
        location: { lat: 46.94795, lng: 7.43557 },
        radius: 3
      },
      {
        id: 'platform 2, sector A',
        entranceGroup: 'platform 2',
        location: { lat: 46.94983, lng: 7.43979 },
        radius: 4,
        connections: ['platform 2, sector B']
      },
      {
        id: 'platform 2, sector B',
        entranceGroup: 'platform 2',
        location: { lat: 46.94963, lng: 7.43966 },
        radius: 4,
        connections: ['platform 2, sector C']
      },
      {
        id: 'platform 2, sector C',
        entranceGroup: 'platform 2',
        location: { lat: 46.94942, lng: 7.43948 },
        radius: 4,
        connections: ['platform 2, sector D']
      },
      {
        id: 'platform 2, sector D',
        entranceGroup: 'platform 2',
        location: { lat: 46.94923, lng: 7.43926 },
        radius: 4
      },
      {
        id: 'platform 2, sector E',
        entranceGroup: 'platform 2',
        location: { lat: 46.94887, lng: 7.43862 },
        radius: 4,
        connections: ['platform 2, sector F']
      },
      {
        id: 'platform 2, sector F',
        entranceGroup: 'platform 2',
        location: { lat: 46.94875, lng: 7.43839 },
        radius: 4,
        connections: ['platform 2, sector G']
      },
      {
        id: 'platform 2, sector G',
        entranceGroup: 'platform 2',
        location: { lat: 46.94864, lng: 7.43811 },
        radius: 4,
        connections: ['platform 2, sector H']
      },
      {
        id: 'platform 2, sector H',
        entranceGroup: 'platform 2',
        location: { lat: 46.94855, lng: 7.43784 },
        radius: 4,
        connections: ['platform 2, sector I']
      },
      {
        id: 'platform 2, sector I',
        entranceGroup: 'platform 2',
        location: { lat: 46.94843, lng: 7.43738 },
        radius: 4,
        connections: ['Wave, platform 2, escalator east, low']
      },
      {
        id: 'platform 2, sector J',
        entranceGroup: 'platform 2',
        location: { lat: 46.94818, lng: 7.43611 },
        radius: 3,
        connections: ['platform 2, sector K']
      },
      {
        id: 'platform 2, sector K',
        entranceGroup: 'platform 2',
        location: { lat: 46.94808, lng: 7.43558 },
        radius: 3,
        connections: ['platform 2, sector L']
      },
      {
        id: 'platform 2, sector L',
        entranceGroup: 'platform 2',
        location: { lat: 46.94796, lng: 7.43490 },
        radius: 3
      },
      {
        id: 'platform 3, sector A',
        entranceGroup: 'platform 3',
        location: { lat: 46.94988, lng: 7.43964 },
        radius: 4,
        connections: ['platform 3, sector B']
      },
      {
        id: 'platform 3, sector B',
        entranceGroup: 'platform 3',
        location: { lat: 46.94969, lng: 7.43948 },
        radius: 4,
        connections: ['platform 3, sector C']
      },
      {
        id: 'platform 3, sector C',
        entranceGroup: 'platform 3',
        location: { lat: 46.94951, lng: 7.43932 },
        radius: 4,
        connections: ['platform 3, sector D']
      },
      {
        id: 'platform 3, sector D',
        entranceGroup: 'platform 3',
        location: { lat: 46.94933, lng: 7.43909 },
        radius: 4
      },
      {
        id: 'platform 3, sector E',
        entranceGroup: 'platform 3',
        location: { lat: 46.94898, lng: 7.43849 },
        radius: 4,
        connections: ['platform 3, sector F']
      },
      {
        id: 'platform 3, sector F',
        entranceGroup: 'platform 3',
        location: { lat: 46.94889, lng: 7.43826 },
        radius: 4,
        connections: ['platform 3, sector G']
      },
      {
        id: 'platform 3, sector G',
        entranceGroup: 'platform 3',
        location: { lat: 46.94878, lng: 7.43801 },
        radius: 4,
        connections: ['platform 3, sector H']
      },
      {
        id: 'platform 3, sector H',
        entranceGroup: 'platform 3',
        location: { lat: 46.94869, lng: 7.43777 },
        radius: 4,
        connections: ['platform 3, sector I']
      },
      {
        id: 'platform 3, sector I',
        entranceGroup: 'platform 3',
        location: { lat: 46.94856, lng: 7.43731 },
        radius: 4,
        connections: ['Wave, platform 3, escalator east, low']
      },
      {
        id: 'platform 3, sector J',
        entranceGroup: 'platform 3',
        location: { lat: 46.94832, lng: 7.43608 },
        radius: 3,
        connections: ['platform 3, sector K']
      },
      {
        id: 'platform 3, sector K',
        entranceGroup: 'platform 3',
        location: { lat: 46.94820, lng: 7.43548 },
        radius: 3,
        connections: ['platform 3, sector L']
      },
      {
        id: 'platform 3, sector L',
        entranceGroup: 'platform 3',
        location: { lat: 46.94808, lng: 7.43484 },
        radius: 3
      },
      {
        id: 'platform 4, sector A',
        entranceGroup: 'platform 4',
        location: { lat: 46.94993, lng: 7.43951 },
        radius: 4,
        connections: ['platform 4, sector B']
      },
      {
        id: 'platform 4, sector B',
        entranceGroup: 'platform 4',
        location: { lat: 46.94976, lng: 7.43935 },
        radius: 4,
        connections: ['platform 4, sector C']
      },
      {
        id: 'platform 4, sector C',
        entranceGroup: 'platform 4',
        location: { lat: 46.94960, lng: 7.43918 },
        radius: 4,
        connections: ['platform 4, sector D']
      },
      {
        id: 'platform 4, sector D',
        entranceGroup: 'platform 4',
        location: { lat: 46.94944, lng: 7.43895 },
        radius: 4
      },
      {
        id: 'platform 4, sector E',
        entranceGroup: 'platform 4',
        location: { lat: 46.94910, lng: 7.43832 },
        radius: 4,
        connections: ['platform 4, sector F']
      },
      {
        id: 'platform 4, sector F',
        entranceGroup: 'platform 4',
        location: { lat: 46.94900, lng: 7.43811 },
        radius: 4,
        connections: ['platform 4, sector G']
      },
      {
        id: 'platform 4, sector G',
        entranceGroup: 'platform 4',
        location: { lat: 46.94892, lng: 7.43790 },
        radius: 4,
        connections: ['platform 4, sector H']
      },
      {
        id: 'platform 4, sector H',
        entranceGroup: 'platform 4',
        location: { lat: 46.94884, lng: 7.43768 },
        radius: 4,
        connections: ['platform 4, sector I']
      },
      {
        id: 'platform 4, sector I',
        entranceGroup: 'platform 4',
        location: { lat: 46.94870, lng: 7.43724 },
        radius: 4,
        connections: ['Wave, platform 4, escalator east, low']
      },
      {
        id: 'platform 4, sector J',
        entranceGroup: 'platform 4',
        location: { lat: 46.94845, lng: 7.43604 },
        radius: 3,
        connections: ['platform 4, sector K']
      },
      {
        id: 'platform 4, sector K',
        entranceGroup: 'platform 4',
        location: { lat: 46.94831, lng: 7.43539 },
        radius: 3,
        connections: ['platform 4, sector L']
      },
      {
        id: 'platform 4, sector L',
        entranceGroup: 'platform 4',
        location: { lat: 46.94819, lng: 7.43481 },
        radius: 3
      },
      {
        id: 'platform 5, sector A',
        entranceGroup: 'platform 5',
        location: { lat: 46.94999, lng: 7.43940 },
        radius: 4,
        connections: ['platform 5, sector B']
      },
      {
        id: 'platform 5, sector B',
        entranceGroup: 'platform 5',
        location: { lat: 46.94984, lng: 7.43923 },
        radius: 4,
        connections: ['platform 5, sector C']
      },
      {
        id: 'platform 5, sector C',
        entranceGroup: 'platform 5',
        location: { lat: 46.94970, lng: 7.43901 },
        radius: 4,
        connections: ['platform 5, sector D']
      },
      {
        id: 'platform 5, sector D',
        entranceGroup: 'platform 5',
        location: { lat: 46.94957, lng: 7.43881 },
        radius: 4
      },
      {
        id: 'platform 5, sector E',
        entranceGroup: 'platform 5',
        location: { lat: 46.94923, lng: 7.43819 },
        radius: 4,
        connections: ['platform 5, sector F']
      },
      {
        id: 'platform 5, sector F',
        entranceGroup: 'platform 5',
        location: { lat: 46.94912, lng: 7.43798 },
        radius: 4,
        connections: ['platform 5, sector G']
      },
      {
        id: 'platform 5, sector G',
        entranceGroup: 'platform 5',
        location: { lat: 46.94906, lng: 7.43781 },
        radius: 4,
        connections: ['platform 5, sector H']
      },
      {
        id: 'platform 5, sector H',
        entranceGroup: 'platform 5',
        location: { lat: 46.94896, lng: 7.43756 },
        radius: 4,
        connections: ['platform 5, sector I']
      },
      {
        id: 'platform 5, sector I',
        entranceGroup: 'platform 5',
        location: { lat: 46.94884, lng: 7.43716 },
        radius: 4,
        connections: ['Wave, platform 5, escalator east, low']
      },
      {
        id: 'platform 5, sector J',
        entranceGroup: 'platform 5',
        location: { lat: 46.94859, lng: 7.43604 },
        radius: 3
      },
      {
        id: 'platform 6, sector A',
        entranceGroup: 'platform 6',
        location: { lat: 46.95009, lng: 7.43923 },
        radius: 4,
        connections: ['platform 6, sector B']
      },
      {
        id: 'platform 6, sector B',
        entranceGroup: 'platform 6',
        location: { lat: 46.94994, lng: 7.43905 },
        radius: 4,
        connections: ['platform 6, sector C']
      },
      {
        id: 'platform 6, sector C',
        entranceGroup: 'platform 6',
        location: { lat: 46.94982, lng: 7.43885 },
        radius: 4,
        connections: ['platform 6, sector D']
      },
      {
        id: 'platform 6, sector D',
        entranceGroup: 'platform 6',
        location: { lat: 46.94971, lng: 7.43865 },
        radius: 4
      },
      {
        id: 'platform 6, sector E',
        entranceGroup: 'platform 6',
        location: { lat: 46.94938, lng: 7.43804 },
        radius: 4,
        connections: ['platform 6, sector F']
      },
      {
        id: 'platform 6, sector F',
        entranceGroup: 'platform 6',
        location: { lat: 46.94929, lng: 7.43785 },
        radius: 4,
        connections: ['platform 6, sector G']
      },
      {
        id: 'platform 6, sector G',
        entranceGroup: 'platform 6',
        location: { lat: 46.94919, lng: 7.43765 },
        radius: 4,
        connections: ['platform 6, sector H']
      },
      {
        id: 'platform 6, sector H',
        entranceGroup: 'platform 6',
        location: { lat: 46.94910, lng: 7.43739 },
        radius: 4,
        connections: ['platform 6, sector I']
      },
      {
        id: 'platform 6, sector I',
        entranceGroup: 'platform 6',
        location: { lat: 46.94901, lng: 7.43709 },
        radius: 4,
        connections: ['Wave, platform 6, escalator east, low']
      },
      {
        id: 'platform 6, sector J',
        entranceGroup: 'platform 6',
        location: { lat: 46.94875, lng: 7.43597 },
        radius: 3
      },
      {
        id: 'Wave, platform 1, escalator east, low',
        location: { lat: 46.94821, lng: 7.43700 },
        radius: 2,
        connections: ['Wave, platform 1, escalator east, heigh']
      },
      {
        id: 'Wave, platform 1, escalator east, heigh',
        location: { lat: 46.94817, lng: 7.43679 },
        radius: 2,
        connections: ['Wave, platform 1']
      },
      {
        id: 'Wave, platform 1',
        location: { lat: 46.94816, lng: 7.43671 },
        radius: 4,
        connections: ['Wave, platform 1, escalator west, heigh']
      },
      {
        id: 'Wave, platform 1, escalator west, heigh',
        location: { lat: 46.94814, lng: 7.43662 },
        radius: 2,
        connections: ['Wave, platform 1, escalator west, low']
      },
      {
        id: 'Wave, platform 1, escalator west, low',
        location: { lat: 46.94810, lng: 7.43640 },
        radius: 2,
        connections: ['platform 1, sector J']
      },
      {
        id: 'Wave, platform 2, escalator east, low',
        location: { lat: 46.94834, lng: 7.43694 },
        radius: 2,
        connections: ['Wave, platform 2, escalator east, heigh']
      },
      {
        id: 'Wave, platform 2, escalator east, heigh',
        location: { lat: 46.94830, lng: 7.43674 },
        radius: 2,
        connections: ['Wave, platform 2']
      },
      {
        id: 'Wave, platform 2',
        location: { lat: 46.94829, lng: 7.43667 },
        radius: 4,
        connections: [
          'Wave, platform 2, escalator west, heigh',
          'Wave,  curve']
      },
      {
        id: 'Wave, platform 2, escalator west, heigh',
        location: { lat: 46.94826, lng: 7.43657 },
        radius: 2,
        connections: ['Wave, platform 2, escalator west, low']
      },
      {
        id: 'Wave, platform 2, escalator west, low',
        location: { lat: 46.94822, lng: 7.43635 },
        radius: 2,
        connections: ['platform 2, sector J']
      },
      {
        id: 'Wave, platform 3, escalator east, low',
        location: { lat: 46.94847, lng: 7.43692 },
        radius: 2,
        connections: ['Wave, platform 3, escalator east, heigh']
      },
      {
        id: 'Wave, platform 3, escalator east, heigh',
        location: { lat: 46.94843, lng: 7.43669 },
        radius: 2,
        connections: ['Wave, platform 3']
      },
      {
        id: 'Wave, platform 3',
        location: { lat: 46.94842, lng: 7.43662 },
        radius: 4,
        connections: [
          'Wave, platform 3, escalator west, heigh',
          'Wave, platform 2']
      },
      {
        id: 'Wave, platform 3, escalator west, heigh',
        location: { lat: 46.94840, lng: 7.43652 },
        radius: 2,
        connections: ['Wave, platform 3, escalator west, low']
      },
      {
        id: 'Wave, platform 3, escalator west, low',
        location: { lat: 46.94835, lng: 7.43630 },
        radius: 2,
        connections: ['platform 3, sector J']
      },
      {
        id: 'Wave, platform 4, escalator east, low',
        location: { lat: 46.94861, lng: 7.43686 },
        radius: 2,
        connections: ['Wave, platform 4, escalator east, heigh']
      },
      {
        id: 'Wave, platform 4, escalator east, heigh',
        location: { lat: 46.94856, lng: 7.43663 },
        radius: 2,
        connections: ['Wave, platform 4']
      },
      {
        id: 'Wave, platform 4',
        location: { lat: 46.94855, lng: 7.43656 },
        radius: 4,
        connections: [
          'Wave, platform 4, escalator west, heigh',
          'Wave, platform 3']
      },
      {
        id: 'Wave, platform 4, escalator west, heigh',
        location: { lat: 46.94853, lng: 7.43646 },
        radius: 2,
        connections: ['Wave, platform 4, escalator west, low']
      },
      {
        id: 'Wave, platform 4, escalator west, low',
        location: { lat: 46.94849, lng: 7.43625 },
        radius: 2,
        connections: ['platform 4, sector J']
      },
      {
        id: 'Wave, platform 5, escalator east, low',
        location: { lat: 46.94875, lng: 7.43681 },
        radius: 2,
        connections: ['Wave, platform 5, escalator east, heigh']
      },
      {
        id: 'Wave, platform 5, escalator east, heigh',
        location: { lat: 46.94870, lng: 7.43658 },
        radius: 2,
        connections: ['Wave, platform 5']
      },
      {
        id: 'Wave, platform 5',
        location: { lat: 46.94868, lng: 7.43651 },
        radius: 4,
        connections: [
          'Wave, platform 5, escalator west, heigh',
          'Wave, platform 4']
      },
      {
        id: 'Wave, platform 5, escalator west, heigh',
        location: { lat: 46.94866, lng: 7.43641 },
        radius: 2,
        connections: ['Wave, platform 5, escalator west, low']
      },
      {
        id: 'Wave, platform 5, escalator west, low',
        location: { lat: 46.94862, lng: 7.43624 },
        radius: 2,
        connections: ['platform 5, sector J']
      },
      {
        id: 'Wave, platform 6, escalator east, low',
        location: { lat: 46.94892, lng: 7.43673 },
        radius: 2,
        connections: ['Wave, platform 6, escalator east, heigh']
      },
      {
        id: 'Wave, platform 6, escalator east, heigh',
        location: { lat: 46.94887, lng: 7.43651 },
        radius: 2,
        connections: ['Wave, platform 6']
      },
      {
        id: 'Wave, platform 6',
        location: { lat: 46.94885, lng: 7.43643 },
        radius: 4,
        connections: [
          'Wave, platform 6, escalator west, heigh',
          'Wave, platform 5']
      },
      {
        id: 'Wave, platform 6, escalator west, heigh',
        location: { lat: 46.94882, lng: 7.43634 },
        radius: 2,
        connections: ['Wave, platform 6, escalator west, low']
      },
      {
        id: 'Wave, platform 6, escalator west, low',
        location: { lat: 46.94879, lng: 7.43617 },
        radius: 2,
        connections: ['platform 6, sector J']
      },
      {
        id: 'Wave,  curve',
        location: { lat: 46.94821, lng: 7.43669 },
        radius: 4,
        connections: [
          'Wave, platform 1',
          'Wave, entrance east']
      },
      {
        id: 'Wave, entrance east',
        entranceGroup: 'Wave',
        location: { lat: 46.94826, lng: 7.43699 },
        radius: 4
      },
      {
        id: 'Wave, entrance south',
        entranceGroup: 'Wave',
        location: { lat: 46.94809, lng: 7.43674 },
        radius: 2,
        connections: [
          'Wave, platform 1',
          'Wave, platform 1, escalator east, heigh',
          'Wave, platform 1, escalator west, heigh']
      },
      {
        id: 'Wave, entrance north A, heigh',
        entranceGroup: 'Wave',
        location: { lat: 46.94898, lng: 7.43645 },
        radius: 1,
        connections: ['Wave, entrance north A, low']
      },
      {
        id: 'Wave, entrance north A, low',
        location: { lat: 46.94891, lng: 7.43647 },
        radius: 1,
        connections: [
          'Wave, platform 6',
          'Wave, platform 6, escalator east, heigh'
        ]
      },
      {
        id: 'Wave, entrance north B, heigh',
        entranceGroup: 'Wave',
        location: { lat: 46.94897, lng: 7.43641 },
        radius: 1,
        connections: ['Wave, entrance north B, low']
      },
      {
        id: 'Wave, entrance north B, low',
        location: { lat: 46.94890, lng: 7.43644 },
        radius: 1,
        connections: [
          'Wave, platform 6',
          'Wave, platform 6, escalator east, heigh'
        ]
      },
      {
        id: 'Wave, entrance north C, heigh',
        entranceGroup: 'Wave',
        location: { lat: 46.94896, lng: 7.43637 },
        radius: 1,
        connections: ['Wave, entrance north C, low']
      },
      {
        id: 'Wave, entrance north C, low',
        location: { lat: 46.94889, lng: 7.43641 },
        radius: 1,
        connections: [
          'Wave, platform 6',
          'Wave, platform 6, escalator west, heigh'
        ]
      }
    ]
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
