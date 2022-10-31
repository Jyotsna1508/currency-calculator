import { StringStringPair } from './string-number-pair';

export interface ConvertedDataI {
  date: string;
  historical: boolean;
  info: {
    rate: number;
    timestamp: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}

export interface SymbolsDataI {
  success: boolean;
  symbols: StringStringPair;
}

export interface HistorialDataI {
  base: string;
  end_date: string;
  rates: rateI;
}

export interface rateI {
  [key: string]: {
    [key: string]: number;
  };
}

export interface historicalGraphDataI {
  fromCurrencyHeader: string;
  toCurrencyHeader: string;
  historicalData: rateI;
}
