import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExchangeRatesService } from '../../services/exchange-rates.service';

import { CurrencyConverterFormComponent } from './currency-converter-form.component';

describe('CurrencyConvertorFormComponent', () => {
  let component: CurrencyConverterFormComponent;
  let fixture: ComponentFixture<CurrencyConverterFormComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    const routerstub: Router = TestBed.inject(Router);
    spyOn(routerstub, 'navigate');
    component.navigateToCurrencyDetails();
    expect(routerstub.navigate).toHaveBeenCalledWith(['/exchange-details'], { queryParams: { from: 'EUR', to: 'HRK' }});
  });
});
