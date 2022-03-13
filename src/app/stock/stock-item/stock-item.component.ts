import { Component, OnInit } from '@angular/core';
import { Stock } from '../../model/stock';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {

  public stock: Stock;
  public stocks: Array<Stock>;
  public stockClasses;
  public stockStyles;
  
  constructor() {
    // Empty.
  }

  ngOnInit(): void {
    this.stock = new Stock('Test Stock Company' , 'TSC', 85, 84, '');
    let diff = (this.stock.currentPrice / this.stock.previousPrice) - 1;
    let largeChange = Math.abs(diff) > 0.01;

    this.stocks = [
      new Stock('Test Stock Company' , 'TSC', 85, 80, ''),
      new Stock('Second Stock Company' , 'TSC', 10, 20, ''),
      new Stock('Last Stock Company' , 'TSC', 876, 765, '')
    ];

    this.stockClasses = {
      "positive": this.stock.isPositiveChange(),
      "negative": !this.stock.isPositiveChange(),
      "large-change": largeChange,
      "small-change": !largeChange
    };

    this.stockStyles = {
      "color": this.stock.isPositiveChange() ? "green" : "red",
      "font-size": largeChange ? "2em" : "0.5em"
    };
  }

  toggleFavorite(event, index) {
    alert('We are toggling the favorite state for this stock: ' + index + ' ' + event);
    this.stocks[index].favorite = !this.stocks[index].favorite;
  }
}