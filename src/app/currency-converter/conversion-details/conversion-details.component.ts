import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from 'src/app/shared/enums/currency';
import { ConversionDetailData } from 'src/app/shared/interfaces/conversion-details';
import { AppliedConversionData } from 'src/app/shared/interfaces/coversion-data';

@Component({
  selector: 'app-conversion-details',
  templateUrl: './conversion-details.component.html',
  styleUrls: ['./conversion-details.component.scss']
})
export class ConversionDetailsComponent implements OnInit, OnChanges {
  @Input()appliedConversionFilter: AppliedConversionData = {
    amount: 1,
    fromCurrency: Currency.EUR,
    toCurrency: Currency.HRK,
    currencyRates: {}
  };
  currenciesList: Array<ConversionDetailData> = [];
  constructor() { 
  }
  ngOnChanges(changes: SimpleChanges){
    this.appliedConversionFilter = changes.appliedConversionFilter.currentValue;
    this.createConversionCards();
  }

  ngOnInit(): void {
  }

  private createConversionCards(){
    this.currenciesList = [];
    for (let key in this.appliedConversionFilter.currencyRates){
      let toRate = this.appliedConversionFilter.currencyRates[this.appliedConversionFilter.fromCurrency];
      let fromRate = this.appliedConversionFilter.currencyRates[this.appliedConversionFilter.fromCurrency];
      let currenyConversionDetail = {
        fromCurrencyname: this.appliedConversionFilter.fromCurrency,
        toCurrencyName: key,
        fromAmount: this.appliedConversionFilter.amount,
        toAmount: ((this.appliedConversionFilter.amount * toRate) / fromRate).toFixed(5)
      }
      this.currenciesList.push(currenyConversionDetail);
    }

  }

}
