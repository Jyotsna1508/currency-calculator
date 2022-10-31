import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SymbolsDataI } from '../interfaces/conversion-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencySymbolsService {
  private readonly apiEndpoint = environment.baseUrl;
  constructor(private readonly http: HttpClient) { }

  getCurrencySymbols(): Observable<SymbolsDataI> {
    return this.http.get<SymbolsDataI>(`${this.apiEndpoint}/symbols`);
  }
}
