import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterFormComponent } from './currency-converter-form.component';

describe('CurrencyConvertorFormComponent', () => {
  let component: CurrencyConverterFormComponent;
  let fixture: ComponentFixture<CurrencyConverterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterFormComponent ]
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
});
