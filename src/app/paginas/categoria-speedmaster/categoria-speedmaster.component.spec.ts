import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSpeedmasterComponent } from './categoria-speedmaster.component';

describe('CategoriaSpeedmasterComponent', () => {
  let component: CategoriaSpeedmasterComponent;
  let fixture: ComponentFixture<CategoriaSpeedmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaSpeedmasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaSpeedmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
