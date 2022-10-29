import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  navigateToCurrencyDetails(fromCurrency: string, toCurrency: string){
    this.router.navigate(['/exchange-details'], { queryParams: { from: fromCurrency, to:toCurrency }});
  }

}
