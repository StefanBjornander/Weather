import { Account } from '../model/account';

export class Customer {
  constructor(public customer_number: number,
              public customer_name: string) {
    console.log(customer_number + " " + customer_name);
  }
}
