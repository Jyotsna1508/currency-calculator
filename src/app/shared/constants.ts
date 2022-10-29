import { Currency } from './enums/currency';

export const CurrencyConstants = {
  exchangeRates: {
    base: Currency.EUR,
    rates: {
      AUD: 1.566015,
      HRK: 1.562315,
      INR: 0.562315,
      CAD: 1.560132,
      CHF: 1.154727,
      CNY: 7.827874,
      EUR: 0.882047,
      JPY: 132.360679,
      USD: 1.23396,
    },
  },
  displayedCountry: [
    {
      id: 1,
      name: 'HRK',
    },
    {
      id: 2,
      name: 'INR',
    },
    {
      id: 3,
      name: 'JPY',
    },
    {
      id: 4,
      name: 'EUR',
    },
    {
      id: 5,
      name: 'CAD',
    },
    {
      id: 6,
      name: 'CHF',
    },
    {
      id: 7,
      name: 'CNY',
    },
    {
      id: 8,
      name: 'USD',
    },
    {
      id: 8,
      name: 'USD',
    },
  ],
  rates: {
    '2021-01-22': {
      EUR: 1,
      USD: 1.2172,
    },
    '2021-01-23': {
      EUR: 2,
      USD: 2.1745,
    },
    '2021-01-24': {
      EUR: 1,
      USD: 1.216893,
    },
    '2021-01-25': {
      EUR: 1,
      USD: 1.214483,
    },
    '2021-01-26': {
      EUR: 4,
      USD: 1.216285,
    },
    '2021-01-27': {
      EUR: 1,
      USD: 1.210364,
    },
    '2021-01-28': {
      EUR: 6,
      USD: 2.11967,
    },
    '2021-01-29': {
      EUR: 1,
      USD: 1.21377,
    },
    '2021-01-30': {
      EUR: 1,
      USD: 3.21375,
    },
    '2021-01-31': {
      EUR: 1,
      USD: 1.212341,
    },
    '2021-02-01': {
      EUR: 1,
      USD: 1.206833,
    },
    '2021-02-02': {
      EUR: 1,
      USD: 1.203869,
    },
    '2021-02-03': {
      EUR: 1,
      USD: 1.20409,
    },
  },
  mockedHistoricalData: {
    base: 'EUR',
    end_date: '2021-08-22',
    rates: {
      '2021-01-22': {
        EUR: 1,
        USD: 1.2172,
      },
      '2021-01-23': {
        EUR: 1,
        USD: 1.21745,
      },
      '2021-01-24': {
        EUR: 1,
        USD: 1.216893,
      },
      '2021-01-25': {
        EUR: 1,
        USD: 1.214483,
      },
      '2021-01-26': {
        EUR: 1,
        USD: 1.216285,
      },
    },
  },
  mockExchangeData: {
    base: 'EUR',
    date: '2022-10-29',
    rates: {
      AED: 3.660047,
      AFN: 87.689036,
      ALL: 117.985092,
      AMD: 394.131073,
      ANG: 1.797177,
      AOA: 480.905834,
      ARS: 155.450294,
      AUD: 1.553347,
      AWG: 1.793632,
      AZN: 1.697942,
    },
  },
  mockSymbolData: {
    success: true,
    symbols: {
      AED: 'United Arab Emirates Dirham',
      AFN: 'Afghan Afghani',
      ALL: 'Albanian Lek',
      AMD: 'Armenian Dram',
      ANG: 'Netherlands Antillean Guilder',
      AOA: 'Angolan Kwanza',
      ARS: 'Argentine Peso',
      AUD: 'Australian Dollar',
      AWG: 'Aruban Florin',
      AZN: 'Azerbaijani Manat',
      BAM: 'Bosnia-Herzegovina Convertible Mark',
      BBD: 'Barbadian Dollar',
      BDT: 'Bangladeshi Taka',
      BGN: 'Bulgarian Lev',
      BHD: 'Bahraini Dinar',
    },
  },
  mockConvertionData: {
    "date": "2022-10-29",
    "historical": true,
    "info": {
      "rate": 0.996462,
      "timestamp": 1667005503
    },
    "query": {
      "amount": 6,
      "from": "EUR",
      "to": "USD"
    },
    "result": 5.978772,
    "success": true
  }
};
