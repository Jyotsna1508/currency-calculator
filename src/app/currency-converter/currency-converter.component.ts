import { Component, OnInit } from '@angular/core';
import { Currency } from '../shared/enums/currency';
import { AppliedConversionData } from '../shared/interfaces/coversion-data';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit {
  updatedAppliedConversionData: AppliedConversionData = {
    amount: 1,
    fromCurrency: Currency.EUR,
    currencyRates: {}
  };
  showConversionDetails: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  updatedAppliedConversion(filteredConversion: AppliedConversionData){
    this.showConversionDetails = false;
    this.updatedAppliedConversionData = filteredConversion;
    this.showConversionDetails = true;
  }

}
