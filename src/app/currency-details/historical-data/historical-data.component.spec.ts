import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyConstants } from 'src/app/shared/constants';
import { HistoricalDataComponent } from './historical-data.component';
import { Chart, ChartConfiguration, ChartItem } from 'chart.js';
describe('HistoricalDataComponent', () => {
  let component: HistoricalDataComponent;
  let fixture: ComponentFixture<HistoricalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.fromCurrencyHeader = 'AED';
    spyOn(component, 'createChart');
    let currentHistoricalValue = {
      fromCurrencyHeader:'EUR',
      toCurrencyHeader: 'INR',
      historicalData: {}
    }
    component.ngOnChanges({
      historicalGraphData: new SimpleChange({}, currentHistoricalValue, false)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on ngOnchanges update fromCurrencyHeader value', () => {
    expect(component.fromCurrencyHeader).toEqual('EUR');
  });

  it('on ngOnchanges update fromCurrencyHeader value', () => {
    expect(component.toCurrencyHeader).toEqual('INR');
  });
  it('on ngOnchanges update fromCurrencyHeader value', () => {
    expect(component.historicalData).toEqual({});
  });
});
