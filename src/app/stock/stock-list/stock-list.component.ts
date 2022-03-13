import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stocks: Stock[];

  constructor(private stockService: StockService) {
    // Empty.
  }

  ngOnInit(): void {
    this.stocks = this.stockService.getStocks();
    //alert(JSON.stringify(this.stocks));
  }

  onToggleFavorite(stock: Stock) {
    alert('Favorite for stock ' + stock + ' was triggered.');
    this.stockService.toggleFavorite(stock);
  }
}
