import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyConstants } from '../shared/constants';
import { Currency } from '../shared/enums/currency';
import { HistorialDataI, rateI, SymbolsDataI } from '../shared/interfaces/conversion-response';
import { CurrencySymbolsService } from '../shared/services/currency-symbols.service';
import { HistoricalDataService } from '../shared/services/historical-data.service';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss'],
})
export class CurrencyDetailsComponent implements OnInit {
  fromCurrency: string = Currency.EUR;
  fromCurrencyHeader: string = '';
  toCurrencyHeader: string = Currency.HRK;
  historicalData: rateI = CurrencyConstants.rates;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currencySymbolsService: CurrencySymbolsService,
    private historicalDataService: HistoricalDataService
  ) {}

  ngOnInit(): void {
    this.fromCurrency =
      this.activatedRoute.snapshot.queryParams['from'] || Currency.EUR;
    this.fromCurrencyHeader = `${this.fromCurrency}`;
    this.toCurrencyHeader =
      this.activatedRoute.snapshot.queryParams['to'] || Currency.HRK;
    this.getCurrencyMapping();
    this.getHistoricalData();
  }

  getCurrencyMapping() {
    this.currencySymbolsService.getCurrencySymbols().subscribe(
      (symbolsData: SymbolsDataI): void => {
        if (symbolsData && symbolsData.symbols) {
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
    let endDate = '2021-08-22';
    this.historicalDataService.getHistoricalRates(startDate,endDate,Currency.EUR,[this.fromCurrency, this.toCurrencyHeader]).subscribe(
      (historicalData: HistorialDataI): void => {
        if(historicalData && historicalData.rates){
          this.historicalData = historicalData.rates;
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
}
