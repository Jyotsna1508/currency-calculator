import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Currency } from '../../enums/currency';
import { FormNames } from '../../enums/form-names';
import { ExchangeRates } from '../../interfaces/exchange-rates';
@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss'],
})
export class CurrencyConverterFormComponent implements OnInit {
  currencyConverterForm: FormGroup = new FormGroup({
    amount: new FormControl('1'),
    fromCurrency: new FormControl(''),
    toCurrency: new FormControl(''),
  });
  fromCurrencyRate: number = 0;
  toCurrencyRate: number = 0;

  exchangeRates: ExchangeRates = {
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
  };

  conversions = [
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
  ];

  result: string = '0';
  amount: number = 0;
  fromDropdownName: string = Currency.EUR;
  toDropdownName: string = Currency.HRK;
  formNames = FormNames;
  @Output() sendSelectedFilter = new EventEmitter;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.currencyConverterForm = this.initForm(
      this.fromDropdownName,
      this.toDropdownName
    );
    this.fromCurrencyRate =
      this.exchangeRates.rates[
        this.currencyConverterForm.get(FormNames.FromCurrency)?.value
      ];
    this.toCurrencyRate =
      this.exchangeRates.rates[
        this.currencyConverterForm.get(FormNames.ToCurrency)?.value
      ];
      this.sendUpdatedFilterdata();
  }
  convertCurrency() {
    this.fromCurrencyRate =
      this.exchangeRates.rates[
        this.currencyConverterForm.get(FormNames.FromCurrency)?.value
      ];
    this.toCurrencyRate =
      this.exchangeRates.rates[
        this.currencyConverterForm.get(FormNames.ToCurrency)?.value
      ];
    this.amount = Math.floor(
      this.currencyConverterForm.get(FormNames.Amount)?.value
    );
    this.result = this.calculateExchangeRate(
      this.fromCurrencyRate,
      this.toCurrencyRate
    );
    this.sendUpdatedFilterdata();
  }

  conversionTypechange() {
    this.toCurrencyRate = this.exchangeRates.rates[this.toDropdownName];
    this.fromCurrencyRate = this.exchangeRates.rates[this.fromDropdownName];
    this.result = '0';
  }

  swapCurrencies() {
    let fromCurrency = this.fromDropdownName;
    this.fromDropdownName = this.toDropdownName;
    this.toDropdownName = fromCurrency;
    this.currencyConverterForm = this.formBuilder.group({
      amount: [
        this.currencyConverterForm.get(FormNames.Amount)?.value,
        Validators.required,
      ],
      fromCurrency: [this.fromDropdownName, Validators.required],
      toCurrency: [this.toDropdownName, Validators.required],
    });
    this.convertCurrency();
  }
  sendUpdatedFilterdata(){
    this.sendSelectedFilter.emit({
      amount: this.amount,
      fromCurrency: this.fromDropdownName,
      currencyRates: this.exchangeRates.rates
    });
  }
  private initForm(fromCurrency: string, toCurrency: string) {
    return this.formBuilder.group({
      amount: [1, Validators.required],
      fromCurrency: [fromCurrency, Validators.required],
      toCurrency: [toCurrency, Validators.required],
    });
  }

  private calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }
}
