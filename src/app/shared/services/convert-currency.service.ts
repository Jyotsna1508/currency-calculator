import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConvertedDataI } from '../interfaces/conversion-response';

@Injectable({
  providedIn: 'root'
})
export class ConvertCurrencyService {
  private readonly apiEndpoint = 'https://api.apilayer.com/fixer/';
  constructor(private readonly http: HttpClient) { }

  getConvertedRates(toCurrency: string, fromCurrency: string, amount: number): Observable<ConvertedDataI> {
    return this.http.get<ConvertedDataI>(
      `${this.apiEndpoint}/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`
    );
  }
}
