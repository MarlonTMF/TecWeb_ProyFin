import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSeamasterComponent } from './categoria-seamaster.component';

describe('CategoriaSeamasterComponent', () => {
  let component: CategoriaSeamasterComponent;
  let fixture: ComponentFixture<CategoriaSeamasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaSeamasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaSeamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
