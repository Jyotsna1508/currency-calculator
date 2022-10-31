import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistorialDataI } from '../interfaces/conversion-response';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
  private readonly apiEndpoint = 'https://api.apilayer.com/fixer';
  constructor(private readonly http: HttpClient) { }

  getHistoricalRates(startDate: string, endDate: string, baseCurrency: string, symbols: [string, string]): Observable<HistorialDataI> {
    return this.http.get<HistorialDataI>(
      `${this.apiEndpoint}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${symbols}`
    );
  }
}
