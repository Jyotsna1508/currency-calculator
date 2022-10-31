import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConverterComponent } from './currency-converter.component';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain "Currency Exchange"', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    expect(bannerElement.textContent).toContain('Currency Exchange');
  });

  it('should contain "Currency Exchange"', () => {
    let conversionData = {
      amount: 1,
      fromCurrency: 'EUR',
      toCurrency: 'HRK',
      currencyRates: {}
    }
    component.updatedAppliedConversion(conversionData);
    expect(component.updatedAppliedConversionData).toEqual(conversionData);
  });
});
