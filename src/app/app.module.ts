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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
