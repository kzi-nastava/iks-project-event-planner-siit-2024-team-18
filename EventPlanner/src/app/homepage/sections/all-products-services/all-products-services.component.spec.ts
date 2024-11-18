import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsServicesComponent } from './all-products-services.component';

describe('AllProductsServicesComponent', () => {
  let component: AllProductsServicesComponent;
  let fixture: ComponentFixture<AllProductsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductsServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
