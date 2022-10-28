import { StringNumberPair } from "./string-number-pair";

export interface AppliedConversionData {
    amount: number;
    fromCurrency: string;
    currencyRates: StringNumberPair;
}
