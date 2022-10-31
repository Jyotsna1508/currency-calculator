import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConstants } from 'src/app/shared/constants';
import { ConversionDetailsComponent } from './conversion-details.component';

describe('ConversionDetailsComponent', () => {
  let component: ConversionDetailsComponent;
  let fixture: ComponentFixture<ConversionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on ngOnChange Method', () => {
    let newConversionFilter = {
      amount: 1,
      fromCurrency: 'EUR',
      toCurrency: 'HRK',
      currencyRates: {}
    };
    spyOn(component, 'createConversionCards');
    component.ngOnChanges({
      appliedConversionFilter: new SimpleChange(null, newConversionFilter, false)
    });
    fixture.detectChanges();
    expect(component.appliedConversionFilter).toEqual(newConversionFilter);
    expect(component.createConversionCards).toHaveBeenCalled();
    expect(component.currenciesList).toBeDefined();
  });
  it('on createConversionCards create dynamic cards list', () => {
    component.appliedConversionFilter.currencyRates = CurrencyConstants.exchangeRates.rates;
    const mockedResult = CurrencyConstants.mockedCurrencyList;
    component.createConversionCards();
    expect(component.currenciesList).toHaveSize(9);
  });
});
