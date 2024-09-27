import type CalculationMethod from './CalculationMethod';
import { Madhab } from './Madhab';
import HighLatitudeRule from './HighLatitudeRule';
import { PolarCircleResolution } from './PolarCircleResolution';
import { Rounding } from './Rounding';
import { Shafaq } from './Shafaq';
import { ValueOf } from './TypeUtils';
export default class CalculationParameters {
    method: null | keyof typeof CalculationMethod;
    fajrAngle: number;
    ishaAngle: number;
    ishaInterval: number;
    maghribAngle: number;
    madhab: ValueOf<typeof Madhab>;
    highLatitudeRule: ValueOf<typeof HighLatitudeRule>;
    adjustments: {
        fajr: number;
        sunrise: number;
        dhuhr: number;
        asr: number;
        maghrib: number;
        isha: number;
    };
    methodAdjustments: {
        fajr: number;
        sunrise: number;
        dhuhr: number;
        asr: number;
        maghrib: number;
        isha: number;
    };
    polarCircleResolution: ValueOf<typeof PolarCircleResolution>;
    rounding: ValueOf<typeof Rounding>;
    shafaq: ValueOf<typeof Shafaq>;
    constructor(method: null | keyof typeof CalculationMethod, fajrAngle?: number, ishaAngle?: number, ishaInterval?: number, maghribAngle?: number);
    nightPortions(): {
        fajr: number;
        isha: number;
    };
}
