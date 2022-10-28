import { TestBed } from '@angular/core/testing';

import { ConversionDataService } from './conversion-data.service';

describe('ConversionDataService', () => {
  let service: ConversionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
