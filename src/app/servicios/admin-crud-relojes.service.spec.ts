import { TestBed } from '@angular/core/testing';

import { AdminCRUDRelojesService } from './admin-crud-relojes.service';

describe('AdminCRUDRelojesService', () => {
  let service: AdminCRUDRelojesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCRUDRelojesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
