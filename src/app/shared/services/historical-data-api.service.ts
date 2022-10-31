import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HistorialDataI } from '../interfaces/conversion-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricalDataService {
  private readonly apiEndpoint = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }

  getHistoricalRates(startDate: string, endDate: string, baseCurrency: string, symbols: [string, string]): Observable<HistorialDataI> {
    return this.http.get<HistorialDataI>(
      `${this.apiEndpoint}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${baseCurrency}&symbols=${symbols}`
    );
  }
}
