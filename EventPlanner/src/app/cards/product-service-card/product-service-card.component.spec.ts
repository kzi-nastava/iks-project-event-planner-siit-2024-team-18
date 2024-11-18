import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceCardComponent } from './product-service-card.component';

describe('ProductServiceCardComponent', () => {
  let component: ProductServiceCardComponent;
  let fixture: ComponentFixture<ProductServiceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductServiceCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductServiceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
