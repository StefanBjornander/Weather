import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../model/customer';
import { Account } from '../../model/account';
import { History } from '../../model/history';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
  @Input() public customer: Customer;

  constructor() {
  }

  getAccountArray() {
    return this.customer.accountArray;
  }

  ngOnInit(): void {
  }
}