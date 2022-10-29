import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { rateI } from 'src/app/shared/interfaces/conversion-response';
@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss'],
})
export class HistoricalDataComponent implements OnChanges {
  public chart: any;
  @Input() fromCurrencyHeader: string = '';
  @Input() toCurrencyHeader: string = '';
  @Input() historicalData: rateI = {};
  constructor() {
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.fromCurrencyHeader = changes.fromCurrencyHeader.currentValue;
    this.toCurrencyHeader = changes.toCurrencyHeader.currentValue;
    this.historicalData = changes.historicalData.currentValue;
    this.createChart();
  }

  createChart() {
    let toCurrencyData = [];
    let fromCurrencyData = [];
    const xAxesLabels = Object.keys(this.historicalData);
    for (let rate in this.historicalData){
      toCurrencyData.push(this.historicalData[rate][this.toCurrencyHeader]);
      fromCurrencyData.push(this.historicalData[rate][this.fromCurrencyHeader]);
    }
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: xAxesLabels,
        datasets: [
          {
            label: this.fromCurrencyHeader,
            data: fromCurrencyData,
            backgroundColor: 'blue',
          },
          {
            label: this.toCurrencyHeader,
            data: toCurrencyData,
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
}
