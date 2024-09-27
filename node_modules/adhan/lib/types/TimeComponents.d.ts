export default class TimeComponents {
    hours: number;
    minutes: number;
    seconds: number;
    constructor(num: number);
    utcDate(year: number, month: number, date: number): Date;
}
