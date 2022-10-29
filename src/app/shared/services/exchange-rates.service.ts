import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExchangeRates } from '../interfaces/exchange-rates';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {
  private readonly apiEndpoint = 'https://api.apilayer.com/fixer';
  constructor(private readonly http: HttpClient) { }

  getLatestExchangeRates(baseCurrency: string, quoteCurrency = ''): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(
      `${this.apiEndpoint}/latest?symbols=${quoteCurrency}&base=${baseCurrency}`
    );
  }
}
