import type Coordinates from './Coordinates';
declare const HighLatitudeRule: {
    readonly MiddleOfTheNight: "middleofthenight";
    readonly SeventhOfTheNight: "seventhofthenight";
    readonly TwilightAngle: "twilightangle";
    readonly recommended: (coordinates: Coordinates) => "middleofthenight" | "seventhofthenight";
};
export default HighLatitudeRule;
