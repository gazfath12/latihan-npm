import CalculationParameters from './CalculationParameters';
declare const CalculationMethod: {
    readonly MuslimWorldLeague: () => CalculationParameters;
    readonly Egyptian: () => CalculationParameters;
    readonly Karachi: () => CalculationParameters;
    readonly UmmAlQura: () => CalculationParameters;
    readonly Dubai: () => CalculationParameters;
    readonly MoonsightingCommittee: () => CalculationParameters;
    readonly NorthAmerica: () => CalculationParameters;
    readonly Kuwait: () => CalculationParameters;
    readonly Qatar: () => CalculationParameters;
    readonly Singapore: () => CalculationParameters;
    readonly Tehran: () => CalculationParameters;
    readonly Turkey: () => CalculationParameters;
    readonly Other: () => CalculationParameters;
};
export default CalculationMethod;
