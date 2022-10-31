import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/gaurds/auth.guard';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';

const routes: Routes = [
  {
    path: 'currency-converter',
    component: CurrencyConverterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'exchange-details',
    component: CurrencyDetailsComponent
  },
  {
    path: '',
    redirectTo: 'currency-converter',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
