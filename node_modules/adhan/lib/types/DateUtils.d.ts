import { Rounding } from './Rounding';
import { ValueOf } from './TypeUtils';
export declare function dateByAddingDays(date: Date, days: number): Date;
export declare function dateByAddingMinutes(date: Date, minutes: number): Date;
export declare function dateByAddingSeconds(date: Date, seconds: number): Date;
export declare function roundedMinute(date: Date, rounding?: ValueOf<typeof Rounding>): Date;
export declare function dayOfYear(date: Date): number;
export declare function isValidDate(date: Date): boolean;
