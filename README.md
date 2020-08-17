# Leaflet

> Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.

[Live demo](https://doklem.github.io/leaflet-demo/)

## Why using it

* It's community is big [(600+ contributers)](https://github.com/Leaflet/Leaflet/graphs/contributors) and well alive [(~ weekly commits)](https://github.com/Leaflet/Leaflet/pulse).
* The [API reference](https://leafletjs.com/reference) is a bliss.
* There are tons of useful [plugins](https://leafletjs.com/plugins.html).
* Depending on the displayed map it doesn't require an outside connection.
* It's free and open source: [BSD 2-Clause license](https://github.com/Leaflet/Leaflet/blob/master/LICENSE).

## How does it work

You define a DIV-tag as map and add various layers to it in javascript/typescript: [quick start tutorial](https://leafletjs.com/examples/quick-start/).

There are two kinds of layers:

* Baselayers -> They work as the background. Only one at a time can be visible.
* Overlaylayers -> They work as the foreground. Any number of them can be visible. They can be arranged hierarchically to achive the desired look of the displayed features.

Many subclasses of layers exist to serve different purposes: [architecture](https://leafletjs.com/examples/extending/extending-1-classes.html).

## But my map is not a Mercator projection

* [Non-geographical maps tutorial](https://leafletjs.com/examples/crs-simple/crs-simple.html)
* [Zoom levels](https://leafletjs.com/examples/zoom-levels/)

## Which plugins could be of interest

### [Edit geometries](https://leafletjs.com/plugins.html#edit-geometries)

* [Leaflet.Editable](https://github.com/Leaflet/Leaflet.Editable) -> [Live demo](http://leaflet.github.io/Leaflet.Editable/example/index.html)
* [Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)

### [Heatmaps](https://leafletjs.com/plugins.html#heatmaps)

* [Leaflet.heat](https://github.com/Leaflet/Leaflet.heat) -> [Live demo](http://leaflet.github.io/Leaflet.heat/demo/)
* [heatmap.js](https://www.patrick-wied.at/static/heatmapjs/example-heatmap-leaflet.html)

### [Clustering/Decluttering](https://leafletjs.com/plugins.html#clusteringdecluttering)

* [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) -> [Live demo](https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-realworld.388.html)
* [Leaflet.LayerGroup.Collision](https://github.com/MazeMap/Leaflet.LayerGroup.Collision) -> [Live demo](http://mazemap.github.io/Leaflet.LayerGroup.Collision/demo/demo.html)

## Further readings

* [leafletjs.com](https://leafletjs.com/)
* [leafletjs.com/reference.html](https://leafletjs.com/reference.html)
* [leafletjs.com/plugins.html](https://leafletjs.com/plugins.html)
