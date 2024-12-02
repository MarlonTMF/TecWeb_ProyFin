import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearProductoComponent } from './form-crear-producto.component';

describe('FormCrearProductoComponent', () => {
  let component: FormCrearProductoComponent;
  let fixture: ComponentFixture<FormCrearProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
