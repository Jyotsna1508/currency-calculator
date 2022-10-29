import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Chart, registerables} from "chart.js";
@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements OnInit, OnChanges{
  public chart: any;
  @Input() fromCurrencyHeader: string = '';
  @Input() toCurrencyHeader: string = '';
  constructor(){
    Chart.register(...registerables);
  }
  ngOnChanges(changes: SimpleChanges){
    this.fromCurrencyHeader = changes.fromCurrencyHeader.currentValue;
    this.toCurrencyHeader = changes.toCurrencyHeader.currentValue;
  }
  ngOnInit(): void {
    this.createChart();
  }
  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: this.fromCurrencyHeader,
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: this.toCurrencyHeader,
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5,
        scales: {
          y: {
            title: {
              display: true,
              text: 'Rates'
            }
          },
          X: {
            title: {
              display: true,
              text: 'Months'
            }
          }
        }     
      }
      
    });
  }
}
