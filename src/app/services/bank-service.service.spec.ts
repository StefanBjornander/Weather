import { TestBed } from '@angular/core/testing';

import { BankServiceService } from './bank-service.service';

describe('BankServiceService', () => {
  let service: BankServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
