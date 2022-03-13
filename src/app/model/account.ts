export class Account {
  public balance: number;

  constructor(public account_number: number,
              public customer_number: number) {
    this.balance = 1.23;
  }
}
