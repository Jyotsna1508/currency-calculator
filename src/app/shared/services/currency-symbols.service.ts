import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SymbolsDataI } from '../interfaces/conversion-response';

@Injectable({
  providedIn: 'root'
})
export class CurrencySymbolsService {
  private readonly apiEndpoint = 'https://api.apilayer.com/fixer/symbols';
  constructor(private readonly http: HttpClient) { }

  getCurrencySymbols(): Observable<SymbolsDataI> {
    return this.http.get<SymbolsDataI>(`${this.apiEndpoint}`);
  }
}
