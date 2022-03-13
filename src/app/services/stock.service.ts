import { Injectable } from '@angular/core';
import { Stock } from '../model/stock';

@Injectable()
export class StockService {
  public stocks: Stock[];

  constructor() {
    this.stocks = [
      new Stock('Test Stock Company', 'TSC', 85, 80, 'Nasdaq'),
      new Stock('Second Stock Company', 'TSC', 10, 20, 'NSE'),
      new Stock('Last Stock Company', 'TSC', 876, 765, 'NYSE')
    ]; 
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  createStock(stock: Stock) {
    alert(stock.code);
    let foundStock = this.stocks.find(each => (each.code == stock.code));

    if (!foundStock) {
      return false;
    }

    this.stocks.push(stock);
    return true;
  }

  toggleFavorite(stock: Stock) {
    let foundStock = this.stocks.find(each => (each.code == stock.code));
    foundStock.favorite = !foundStock.favorite;
  }
}
