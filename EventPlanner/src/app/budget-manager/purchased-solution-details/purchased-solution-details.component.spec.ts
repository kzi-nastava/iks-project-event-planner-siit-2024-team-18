import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedSolutionDetailsComponent } from './purchased-solution-details.component';

describe('PurchasedSolutionDetailsComponent', () => {
  let component: PurchasedSolutionDetailsComponent;
  let fixture: ComponentFixture<PurchasedSolutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasedSolutionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedSolutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
