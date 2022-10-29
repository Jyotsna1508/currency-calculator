import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrencyConstants } from '../constants';

import { HistoricalDataService } from './historical-data.service';

describe('HistoricalDataService', () => {
  let service: HistoricalDataService;
  let httpController: HttpTestingController;
  let mockHistoricalData = CurrencyConstants.mockedHistoricalData;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HistoricalDataService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call historial data API and return historical rates of currencies', () => {
    let startDate = '2021-01-22';
    let endDate = '2021-08-22';
    service.getHistoricalRates(startDate,endDate, 'EUR',['EUR', 'USD']).subscribe((res) => {
      expect(res).toEqual(mockHistoricalData);
    });
  });
});
