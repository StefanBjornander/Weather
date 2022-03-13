import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CustomerInterface } from '../customer-interface';
import { Customer } from '../model/customer';
import { Account } from '../model/account';
import { History } from '../model/history';
import { map } from 'rxjs/operators';

@Injectable()
export class BankService {
  constructor(private http: HttpClient) {}
  public result;

  getCustomerArray() {
    var x = this.http.get('http://localhost:3000/api/customers')
    console.log("Hello");
    console.log(JSON.stringify(x));
    return x;
  }

  getAccountArray(customerNumber) {
    return this.http.get('http://localhost:3000/api/accounts/' + customerNumber);
  }

  addCustomer(customerName) {
  }

  editCustomer(customerNumber, newCustomerName) {
  }

  deleteCustomer(customerNumber) {
    return null;
  }

  addAccount(customerNumber) {
    return 456;
  }

  deposit(accountNumber, amount) {
  }

  withdraw(accountNumber, amount) {
  }

  getHistory(accountNumber) {
    return [];
  }

  deleteAccount(accountNumber) {
    return null;
  }
}
