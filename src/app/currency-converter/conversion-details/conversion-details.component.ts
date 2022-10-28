import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Currency } from 'src/app/shared/enums/currency';
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
    currencyRates: {}
  };
  constructor() { 
  }
  ngOnChanges(changes: SimpleChanges){
    this.appliedConversionFilter = changes.appliedConversionFilter.currentValue;
  }
  ngOnInit(): void {
  }

}
