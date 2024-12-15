import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProductDialogComponent } from './purchase-product-dialog.component';

describe('PurchaseProductDialogComponent', () => {
  let component: PurchaseProductDialogComponent;
  let fixture: ComponentFixture<PurchaseProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseProductDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
