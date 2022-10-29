import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  
  navigateToCurrencyDetails(fromCurrency: string, toCurrency: string){
    this.router.navigate(['/exchange-details'], { queryParams: { from: fromCurrency, to:toCurrency }});
  }

}
