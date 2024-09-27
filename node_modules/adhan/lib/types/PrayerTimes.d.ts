import Prayer from './Prayer';
import CalculationParameters from './CalculationParameters';
import Coordinates from './Coordinates';
import { ValueOf } from './TypeUtils';
export default class PrayerTimes {
    coordinates: Coordinates;
    date: Date;
    calculationParameters: CalculationParameters;
    fajr: Date;
    sunrise: Date;
    dhuhr: Date;
    asr: Date;
    sunset: Date;
    maghrib: Date;
    isha: Date;
    constructor(coordinates: Coordinates, date: Date, calculationParameters: CalculationParameters);
    timeForPrayer(prayer: ValueOf<typeof Prayer>): Date | null;
    currentPrayer(date?: Date): "none" | "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
    nextPrayer(date?: Date): "none" | "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha";
}
