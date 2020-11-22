import { Circle, LayerGroup } from 'leaflet';
import { IWaypoint } from './../../interfaces/iwaypoint';
import { IWaypointsLayerOptions } from './../../interfaces/iwaypoints-layer-options';

export class WaypointsLayer extends LayerGroup {

    constructor(protected readonly options: IWaypointsLayerOptions) {
        super([], options);
    }

    private static getPopupContent(waypoint: IWaypoint): string {
        return `<div><b>Name</b> ${waypoint.id}</div>
      <div><b>Radius</b> ${waypoint.radius} m</div>`;
    }

    public setWaypoints(waypoints: Array<IWaypoint>): void {
        let optionsClone: IWaypointsLayerOptions;
        let circle: Circle;
        waypoints.forEach(waypoint => {
            optionsClone = JSON.parse(JSON.stringify(this.options));
            optionsClone.radius = waypoint.radius;
            circle = new Circle(waypoint.location, optionsClone);
            this.addLayer(circle);
            circle.bindPopup(WaypointsLayer.getPopupContent(waypoint));
        });
    }
}
