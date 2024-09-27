import type Coordinates from './Coordinates';
import SolarCoordinates from './SolarCoordinates';
export default class SolarTime {
    observer: Coordinates;
    solar: SolarCoordinates;
    prevSolar: SolarCoordinates;
    nextSolar: SolarCoordinates;
    approxTransit: number;
    transit: number;
    sunrise: number;
    sunset: number;
    constructor(date: Date, coordinates: Coordinates);
    hourAngle(angle: number, afterTransit: boolean): number;
    afternoon(shadowLength: number): number;
}
