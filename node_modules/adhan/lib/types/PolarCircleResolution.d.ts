import Coordinates from './Coordinates';
import SolarTime from './SolarTime';
import { ValueOf } from './TypeUtils';
export declare const PolarCircleResolution: {
    readonly AqrabBalad: "AqrabBalad";
    readonly AqrabYaum: "AqrabYaum";
    readonly Unresolved: "Unresolved";
};
export declare const polarCircleResolvedValues: (resolver: ValueOf<typeof PolarCircleResolution>, date: Date, coordinates: Coordinates) => {
    date: Date;
    tomorrow: Date;
    coordinates: Coordinates;
    solarTime: SolarTime;
    tomorrowSolarTime: SolarTime;
};
