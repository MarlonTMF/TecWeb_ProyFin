import { TestBed } from '@angular/core/testing';

import { AdminCrudClientesService } from './admin-crud-clientes.service';

describe('AdminCrudClientesService', () => {
  let service: AdminCrudClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCrudClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
