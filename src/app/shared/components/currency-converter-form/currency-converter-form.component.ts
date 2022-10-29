import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyConstants } from '../../constants';
import { Currency } from '../../enums/currency';
import { FormNames } from '../../enums/form-names';
import { ExchangeRates } from '../../interfaces/exchange-rates';
import { ExchangeRatesService } from '../../services/exchange-rates.service';
@Component({
  selector: 'app-currency-converter-form',
  templateUrl: './currency-converter-form.component.html',
  styleUrls: ['./currency-converter-form.component.scss'],
})
export class CurrencyConverterFormComponent implements OnInit {
  currencyConverterForm: FormGroup = new FormGroup({
    amount: new FormControl(''),
    fromCurrency: new FormControl(''),
    toCurrency: new FormControl(''),
  });
  fromCurrencyRate: number = 0;
  toCurrencyRate: number = 0;
  exchangeRates: ExchangeRates = CurrencyConstants.exchangeRates;
  conversions = CurrencyConstants.displayedCountry;
  result: string = '0';
  amount: number = 1;
  fromDropdownName: string = Currency.EUR;
  toDropdownName: string = Currency.HRK;
  formNames = FormNames;
  @Input() showMoreDetails: boolean = false
  @Output() sendSelectedFilter = new EventEmitter;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private exchangeRatesService: ExchangeRatesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fromDropdownName =
    this.activatedRoute.snapshot.queryParams['from'] || Currency.EUR;
    this.toDropdownName =
    this.activatedRoute.snapshot.queryParams['to'] || Currency.HRK;
    this.currencyConverterForm = this.initForm(
      this.fromDropdownName,
      this.toDropdownName
    );
    this.getExchangeRates(Currency.EUR);
    this.cdr.detectChanges();
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
    this.cdr.detectChanges();
    this.sendUpdatedFilterdata();
  }
  getExchangeRates(baseCurrencyCode: string) {
    this.exchangeRatesService
      .getLatestExchangeRates(baseCurrencyCode)
      .subscribe(
        (exchangeRate: ExchangeRates): void => {
          this.exchangeRates = exchangeRate;
          this.fromCurrencyRate =
          this.exchangeRates.rates[
            this.currencyConverterForm.get(FormNames.FromCurrency)?.value
          ];
          this.toCurrencyRate =
            this.exchangeRates.rates[
              this.currencyConverterForm.get(FormNames.ToCurrency)?.value
            ];
            this.convertCurrency();
            this.sendUpdatedFilterdata();
        },
        (error: Error): void => {
          console.error(`Error: ${error.message}`);
        });
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
      toCurrency: this.toCurrencyRate,
      currencyRates: this.exchangeRates.rates
    });
  }
  navigateToCurrencyDetails(){
    this.router.navigate(
      ['/exchange-details'],
      { queryParams: { from: this.fromDropdownName, to: this.toDropdownName } }
    );
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
