import { Component, OnInit } from '@angular/core';
import { Customer } from '../../model/customer';
import { Account } from '../../model/account';
import { History } from '../../model/history';
import { BankService } from '../../services/bank.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  public customerName;
  private bankService;

  onSubmit(addForm) {
    if (addForm.valid) {
      alert("customer name: <" + this.customerName + ">");
      var customer = new Customer(0, this.customerName, []);
      this.bankService.addCustomer(customer);
    }
    else {
      alert("Add form is in an invalid state.");
    }
  }
}
