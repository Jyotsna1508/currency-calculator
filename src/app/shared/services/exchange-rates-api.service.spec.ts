import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyConstants } from '../constants';

import { ExchangeRatesService } from './exchange-rates-api.service';

describe('ExchangeRatesService', () => {
  let service: ExchangeRatesService;
  let httpController: HttpTestingController;
  let mockExchangeData = CurrencyConstants.mockExchangeData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ExchangeRatesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call exchange Rate API and return exchange rates of currencies', () => {
    service.getLatestExchangeRates('', 'EUR').subscribe((res) => {
    expect(res).toEqual(mockExchangeData);
  });

  });
});
