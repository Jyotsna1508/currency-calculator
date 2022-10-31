import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyDetailsComponent } from './currency-details/currency-details.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CurrencyConverterFormComponent } from './shared/components/currency-converter-form/currency-converter-form.component';
import { ConversionDetailsComponent } from './currency-converter/conversion-details/conversion-details.component';
import { HistoricalDataComponent } from './currency-details/historical-data/historical-data.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    CurrencyConverterComponent,
    CurrencyDetailsComponent,
    HeaderComponent,
    CurrencyConverterFormComponent,
    ConversionDetailsComponent,
    HistoricalDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
