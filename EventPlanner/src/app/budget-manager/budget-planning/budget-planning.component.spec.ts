import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPlanningComponent } from './budget-planning.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BudgetService } from '../../services/budget.service';
import { RouterModule } from '@angular/router';

describe('BudgetPlanningComponent', () => {
  let component: BudgetPlanningComponent;
  let fixture: ComponentFixture<BudgetPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                    RouterModule.forRoot([]),
                  ],
      declarations: [BudgetPlanningComponent],
      providers: [
              BudgetService,
              provideHttpClient(),
              provideHttpClientTesting(),
            ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
