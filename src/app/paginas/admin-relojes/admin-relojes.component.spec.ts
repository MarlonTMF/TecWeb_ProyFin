import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRelojesComponent } from './admin-relojes.component';

describe('AdminRelojesComponent', () => {
  let component: AdminRelojesComponent;
  let fixture: ComponentFixture<AdminRelojesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRelojesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRelojesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
