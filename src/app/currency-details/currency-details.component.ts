import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CurrencyConstants } from '../shared/constants';
import { Currency } from '../shared/enums/currency';
import { HistorialDataI, historicalGraphDataI, rateI, SymbolsDataI } from '../shared/interfaces/conversion-response';
import { AppliedConversionData } from '../shared/interfaces/coversion-data';
import { StringStringPair } from '../shared/interfaces/string-number-pair';
import { CurrencySymbolsService } from '../shared/services/currency-symbols-api.service';
import { HistoricalDataService } from '../shared/services/historical-data-api.service';
@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss'],
})
export class CurrencyDetailsComponent implements OnInit, OnDestroy {
  fromCurrency: string = Currency.EUR;
  fromCurrencyHeader: string = '';
  toCurrencyHeader: string = Currency.HRK;
  historicalGraphData: historicalGraphDataI = {
    fromCurrencyHeader: '',
    toCurrencyHeader: '',
    historicalData: {}
  };
  symbolData: StringStringPair = CurrencyConstants.mockSymbolData.symbols;
  historicalData: rateI = CurrencyConstants.rates;
  destroy: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currencySymbolsService: CurrencySymbolsService,
    private historicalDataService: HistoricalDataService
  ) {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.destroy))
    .subscribe(
      (params: any)=>{
        this.fromCurrency = params['from'] || Currency.EUR;
        this.toCurrencyHeader = params['to'] || Currency.HRK;
        this.fromCurrencyHeader =  this.symbolData ? `${this.fromCurrency} - ${
        this.symbolData[this.fromCurrency]}` :`${this.fromCurrency}`;
        this.getHistoricalData();

  });
  }

  ngOnInit(): void {
    this.getCurrencyMapping();
    this.getHistoricalData();
  }
  updatedHistoricalConversion(filteredConversion: AppliedConversionData){
    this.fromCurrency = filteredConversion.fromCurrency;
    this.toCurrencyHeader = filteredConversion.toCurrency;
    this.fromCurrencyHeader =  this.symbolData ? `${this.fromCurrency} - ${
    this.symbolData[this.fromCurrency]}` :`${this.fromCurrency}`;
    this.getHistoricalData();
  }
  getCurrencyMapping() {
    this.currencySymbolsService.getCurrencySymbols()
    .pipe(takeUntil(this.destroy))
    .subscribe(
      (symbolsData: SymbolsDataI): void => {
        if (symbolsData && symbolsData.symbols) {
          this.symbolData = symbolsData.symbols;
          this.fromCurrencyHeader = `${this.fromCurrency} - ${
            symbolsData.symbols[this.fromCurrency]
          }`;
        }
      },
      (error: Error): void => {
        console.error(`Error: ${error.message}`);
      }
    );
  }

  getHistoricalData(){
    let startDate = '2021-01-22';
    let endDate = '2021-10-22';
    this.historicalDataService.getHistoricalRates(startDate,endDate,Currency.EUR,[this.fromCurrency, this.toCurrencyHeader])
    .pipe(takeUntil(this.destroy))
    .subscribe(
      (historicalData: HistorialDataI): void => {
        if(historicalData && historicalData.rates){
          this.historicalData = historicalData.rates;
          this.historicalGraphData = {
            toCurrencyHeader:  this.toCurrencyHeader,
            fromCurrencyHeader: this.fromCurrency,
            historicalData: this.historicalData
          }
        }       
      },
      (error: Error): void => {
        console.error(`Error: ${error.message}`);
      }
    );
  }
  navigateToCurrencyDetails() {
    this.router.navigateByUrl('/currency-converter');
  }
  ngOnDestroy(): void{
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
