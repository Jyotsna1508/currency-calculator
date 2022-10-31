import { TestBed } from '@angular/core/testing';
import { ConvertCurrencyService } from './convert-currency-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CurrencyConstants } from '../constants';
describe('ConvertCurrencyService', () => {
  let service: ConvertCurrencyService;
  let httpController: HttpTestingController;
  let mockConvertionData = CurrencyConstants.mockConvertionData; 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ConvertCurrencyService);
    httpController = TestBed.inject(HttpTestingController);});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call convert API and return converted rates of currencies', () => {
    service.getConvertedRates('EUR', 'USD', 100).subscribe((res) => {
      expect(res).toEqual(mockConvertionData);
    });
  });
});
