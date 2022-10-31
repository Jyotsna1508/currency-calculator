import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyConstants } from '../constants';
import { CurrencySymbolsService } from './currency-symbols-api.service';

describe('CurrencySymbolsService', () => {
  let service: CurrencySymbolsService;
  let httpController: HttpTestingController;
  let mockSymbolData = CurrencyConstants.mockSymbolData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CurrencySymbolsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call symbol data API and return symbols of currencies', () => {
    service.getCurrencySymbols().subscribe((res) => {
      expect(res).toEqual(mockSymbolData);
    });
  });
});
