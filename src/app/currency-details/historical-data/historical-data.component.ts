import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { historicalGraphDataI, rateI } from 'src/app/shared/interfaces/conversion-response';
@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss'],
})
export class HistoricalDataComponent implements OnChanges, OnDestroy {
  public chart: any;
  fromCurrencyHeader: string = '';
  toCurrencyHeader: string = '';
  historicalData: rateI = {};
  @Input() historicalGraphData: historicalGraphDataI = {
    fromCurrencyHeader: '',
    toCurrencyHeader: '',
    historicalData: {}
  };
  fromCurrencyData: Array<number> = [];
  toCurrencyData: Array<number> = [];
  constructor() {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.fromCurrencyHeader = changes.historicalGraphData.currentValue.fromCurrencyHeader;
    this.toCurrencyHeader = changes.historicalGraphData.currentValue.toCurrencyHeader;;
    this.historicalData = changes.historicalGraphData.currentValue.historicalData;
    this.createChart();
  }

  createChart() {
    if (this.chart) this.chart.destroy(); 
    this.toCurrencyData = [];
    this.fromCurrencyData = [];
    const xAxesLabels = Object.keys(this.historicalData);
    for (let rate in this.historicalData){
      this.toCurrencyData.push(this.historicalData[rate][this.toCurrencyHeader]);
      this.fromCurrencyData.push(this.historicalData[rate][this.fromCurrencyHeader]);
    }
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: xAxesLabels,
        datasets: [
          {
            label: this.fromCurrencyHeader,
            data: this.fromCurrencyData,
            backgroundColor: 'blue',
          },
          {
            label: this.toCurrencyHeader,
            data: this.toCurrencyData,
            backgroundColor: 'limegreen',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Rates',
            },
          },
          X: {
            title: {
              display: true,
              text: 'Months',
            },
          },
        },
      },
    });
  }

  ngOnDestroy(): void{
    this.chart.destroy();
  }
}
