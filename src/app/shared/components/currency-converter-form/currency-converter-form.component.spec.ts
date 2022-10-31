import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CurrencyConstants } from '../../constants';
import { ExchangeRatesService } from '../../services/exchange-rates.service';
import * as Rx from 'rxjs';
import { CurrencyConverterFormComponent } from './currency-converter-form.component';
import { Subject, throwError } from 'rxjs';

describe('CurrencyConvertorFormComponent', () => {
  let component: CurrencyConverterFormComponent;
  let fixture: ComponentFixture<CurrencyConverterFormComponent>;
  let exchangeRatesService: ExchangeRatesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ CurrencyConverterFormComponent ],
      providers: [ExchangeRatesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    exchangeRatesService = TestBed.inject(ExchangeRatesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('on ngOnInit', () => {
    spyOn(component, 'getExchangeRates');
    component.ngOnInit();
    expect(component.getExchangeRates).toHaveBeenCalled();
  });

  it('should navigate', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');
    component.navigateToCurrencyDetails();
    expect(routerstub.navigate).toHaveBeenCalledWith(['/exchange-details'], { queryParams: { from: 'EUR', to: 'HRK' }});
  });

  it('on convertCurrency', () => {
    component.convertCurrency();
    expect(component.fromCurrencyRate).toBeDefined();
    expect(component.toCurrencyRate).toBeDefined();
    expect(component.result).toBeDefined();
  });  

  it('on swapCurrencies', () => {
    spyOn(component, 'convertCurrency');
    component.swapCurrencies();
    expect(component.fromCurrencyRate).toBeDefined();
    expect(component.toCurrencyRate).toBeDefined();
    expect(component.convertCurrency).toHaveBeenCalled();
  }); 

  it('should call getExchangeRates and get response from exchange rate service', fakeAsync(() => {
    const service = TestBed.inject(ExchangeRatesService);
    spyOn(component,'convertCurrency');
    spyOn(component,'sendUpdatedFilterdata');
    spyOn(service,'getLatestExchangeRates').and.callFake(() => {
      return Rx.of(CurrencyConstants.mockExchangeData);
    });
    component.getExchangeRates('EUR');
    tick();
    expect(component.exchangeRates).toEqual(CurrencyConstants.mockExchangeData);
    expect(component.convertCurrency).toHaveBeenCalled();
    expect(component.sendUpdatedFilterdata).toHaveBeenCalled();
  }));
  it('call getExchangeRates and show error for error', fakeAsync(() => {
    component.destroy = new Subject<boolean>();
    const service = TestBed.inject(ExchangeRatesService);
    const errorResponse=new Error('403 errror');
    spyOn(console, 'error');
    spyOn(service,'getLatestExchangeRates').and.returnValue(throwError(errorResponse));
    component.getExchangeRates('EUR');
    tick();
    expect(console.error).toHaveBeenCalledWith('Error: 403 errror');
  }));
});
