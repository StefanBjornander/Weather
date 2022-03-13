export class Stock {
  favorite : boolean = false;

  constructor(public name : string,
              public code : string,
              public currentPrice : number,
              public previousPrice : number,
              public exchange : string) {}

  isPositiveChange() : boolean {
    return (this.currentPrice > this.previousPrice);
  }
}
