import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { CurrencyConstants } from '../../constants';
import { Currency } from '../../enums/currency';
import { FormNames } from '../../enums/form-names';
import { ExchangeRates } from '../../interfaces/exchange-rates';
import { ExchangeRatesService } from '../../services/exchange-rates-api.service';
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
  disabledConvertButton: boolean = false;
  exchangeRates: ExchangeRates = CurrencyConstants.exchangeRates;
  conversions = CurrencyConstants.displayedCountry;
  result: string = '0';
  amount: number = 1;
  fromDropdownName: string = Currency.EUR;
  toDropdownName: string = Currency.HRK;
  formNames = FormNames;
  showLoader: boolean = true;
  destroy: Subject<boolean> = new Subject<boolean>();
  @Input() showMoreDetails: boolean = false
  @Output() sendSelectedFilter = new EventEmitter;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private exchangeRatesService: ExchangeRatesService,
    private cdr: ChangeDetectorRef) {
      this.activatedRoute.queryParams.subscribe(
        (params: any)=>{
          this.fromDropdownName = params['from'] || Currency.EUR;
          this.toDropdownName = params['to'] || Currency.HRK;
    });
    }

  ngOnInit(): void {
    let parsedFormData;
    this.disabledConvertButton = this.showMoreDetails;
    this.currencyConverterForm = this.initForm(
      this.fromDropdownName,
      this.toDropdownName,
      1
    );
    let getFormData = sessionStorage.getItem('formDetails') || '';
    if (getFormData){
      parsedFormData = JSON.parse(getFormData);
    }
    if (parsedFormData){
      this.exchangeRates.rates = parsedFormData?.currencyRates;
      this.amount = parsedFormData.amount;
      this.toDropdownName = parsedFormData.toDropdownName;
      this.fromDropdownName = parsedFormData.fromDropdownName;
      this.result = parsedFormData.result;
      this.toCurrencyRate = parsedFormData.toCurrencyRate;
      this.currencyConverterForm.controls[FormNames.Amount].setValue(this.amount);
      this.initForm(parsedFormData.fromDropdownName, parsedFormData.toDropdownName, parsedFormData.amount)
      this.showLoader = false;
      this.sendUpdatedFilterdata();
    } else {
      this.getExchangeRates(Currency.EUR);
    }
    this.cdr.detectChanges();
  }
  convertCurrency() {
    sessionStorage.removeItem('formDetails');
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
      .pipe(takeUntil(this.destroy))
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
            this.showLoader = false;
        },
        (error: Error): void => {
          console.error(`Error: ${error.message}`);
          this.showLoader = false;
        });
  }

  conversionTypechange() {
    this.toCurrencyRate = this.exchangeRates.rates[this.toDropdownName];
    this.fromCurrencyRate = this.exchangeRates.rates[this.fromDropdownName];
    if (!sessionStorage.getItem('formDetails')){
      this.result = '0';
    }
    if (!this.showMoreDetails){
      this.disabledConvertButton = true;
    }
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
      toCurrency: this.toDropdownName,
      currencyRates: this.exchangeRates.rates
    });
  }
  navigateToCurrencyDetails(){
    let formData = {
      toDropdownName: this.toDropdownName,
      fromDropdownName: this.fromDropdownName,
      amount: this.amount,
      currencyRates: this.exchangeRates.rates,
      result: this.result,
      toCurrencyRate: this.toCurrencyRate
    }
    sessionStorage.setItem('formDetails', JSON.stringify(formData));
    this.router.navigate(
      ['/exchange-details'],
      { queryParams: { from: this.fromDropdownName, to: this.toDropdownName } }
    );
  }
  private initForm(fromCurrency: string, toCurrency: string, amount: number) {
    return this.formBuilder.group({
      amount: [amount, Validators.required],
      fromCurrency: [fromCurrency, Validators.required],
      toCurrency: [toCurrency, Validators.required],
    });
  }

  private calculateExchangeRate(fromRate: number, toRate: number): string {
    return ((this.amount * toRate) / fromRate).toFixed(5);
  }

  ngOnDestroy(): void{
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
