import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveProductsServicesComponent } from './top-five-products-services.component';

describe('TopFiveProductsServicesComponent', () => {
  let component: TopFiveProductsServicesComponent;
  let fixture: ComponentFixture<TopFiveProductsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopFiveProductsServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFiveProductsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
