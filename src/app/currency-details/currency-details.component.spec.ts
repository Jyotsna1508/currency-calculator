import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencySymbolsService } from '../shared/services/currency-symbols.service';
import { HistoricalDataService } from '../shared/services/historical-data.service';
import * as Rx from 'rxjs';
import { CurrencyDetailsComponent } from './currency-details.component';
import { CurrencyConstants } from '../shared/constants';
import { Subject, throwError } from 'rxjs';
describe('CurrencyDetailsComponent', () => {
  let component: CurrencyDetailsComponent;
  let fixture: ComponentFixture<CurrencyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CurrencyDetailsComponent],
      providers: [CurrencySymbolsService, HistoricalDataService, HttpClient],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should contain "From Currency Label"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('EUR');
  });

  it('on ngOnInit', () => {
    spyOn(component, 'getCurrencyMapping');
    spyOn(component, 'getHistoricalData');
    component.ngOnInit();
    expect(component.getCurrencyMapping).toHaveBeenCalled();
    expect(component.getHistoricalData).toHaveBeenCalled();
  });

  it('should navigate', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigateByUrl');
    component.navigateToCurrencyDetails();
    expect(routerstub.navigateByUrl).toHaveBeenCalledWith('/currency-converter');
  }); 
  it('should call getHistoricalData and get response from historical service', fakeAsync(() => {
    const service = TestBed.inject(HistoricalDataService);
    spyOn(service,'getHistoricalRates').and.callFake(() => {
      return Rx.of(CurrencyConstants.mockedHistoricalData);
    });
    component.getHistoricalData();
    tick();
    expect(component.historicalData).toEqual(CurrencyConstants.mockedHistoricalData.rates);
  }));
  it('should call getCurrencyMapping and get response from symbol service', fakeAsync(() => {
    const service = TestBed.inject(CurrencySymbolsService);
    spyOn(service,'getCurrencySymbols').and.callFake(() => {
      return Rx.of(CurrencyConstants.mockSymbolData);
    });
    component.getCurrencyMapping();
    tick();
    expect(component.fromCurrencyHeader).toEqual('EUR - EUR');
  }));
  it('on CurrencySymbolsService and show error for error', fakeAsync(() => {
    component.destroy = new Subject<boolean>();
    const service = TestBed.inject(CurrencySymbolsService);
    const errorResponse=new Error('403 errror');
    spyOn(console, 'error');
    spyOn(service,'getCurrencySymbols').and.returnValue(throwError(errorResponse));
    component.getCurrencyMapping();
    tick();
    expect(console.error).toHaveBeenCalledWith('Error: 403 errror');
  }));
});
