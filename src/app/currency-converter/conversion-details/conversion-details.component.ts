import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CurrencyConstants } from 'src/app/shared/constants';
import { Currency } from 'src/app/shared/enums/currency';
import { ConversionDetailData } from 'src/app/shared/interfaces/conversion-details';
import { AppliedConversionData } from 'src/app/shared/interfaces/coversion-data';

@Component({
  selector: 'app-conversion-details',
  templateUrl: './conversion-details.component.html',
  styleUrls: ['./conversion-details.component.scss']
})
export class ConversionDetailsComponent implements OnChanges {
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

  createConversionCards(){
    this.currenciesList = [];
    for (let key in CurrencyConstants.displayedCountry){
      let toRate = this.appliedConversionFilter.currencyRates?.[CurrencyConstants.displayedCountry[key].name];
      let fromRate = this.appliedConversionFilter.currencyRates?.[this.appliedConversionFilter?.fromCurrency];
      let currenyConversionDetail = {
        fromCurrencyname: this.appliedConversionFilter.fromCurrency,
        toCurrencyName: CurrencyConstants.displayedCountry[key].name,
        fromAmount: this.appliedConversionFilter.amount,
        toAmount: this.appliedConversionFilter.amount && toRate && fromRate ?
        (((this.appliedConversionFilter.amount) * toRate) / fromRate).toFixed(5): ''
      }
      this.currenciesList.push(currenyConversionDetail);
    }

  }

}
