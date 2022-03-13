import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StockItemComponent } from './stock/stock-item/stock-item.component';
import { CreateStockComponent } from './stock/create-stock/create-stock.component';
import { StockListComponent } from './stock/stock-list/stock-list.component';
import { BankService } from './services/bank.service';
import { HttpHeaders } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StockItemComponent,
    CreateStockComponent,
    StockListComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [
    BankService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
