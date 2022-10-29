import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from '../shared/enums/currency';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {
  fromCurrencyHeader: string = Currency.EUR;
  toCurrencyHeader: string = Currency.HRK;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fromCurrencyHeader = this.activatedRoute.snapshot.queryParams['from'] || Currency.EUR;
    this.toCurrencyHeader = this.activatedRoute.snapshot.queryParams['to'] || Currency.HRK;
  }

  navigateToCurrencyDetails(){
    this.router.navigateByUrl('/currency-converter');
  }

}
