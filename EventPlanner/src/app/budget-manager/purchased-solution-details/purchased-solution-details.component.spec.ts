import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedSolutionDetailsComponent } from './purchased-solution-details.component';
import { SolutionService } from '../../services/solution.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('PurchasedSolutionDetailsComponent', () => {
  let component: PurchasedSolutionDetailsComponent;
  let fixture: ComponentFixture<PurchasedSolutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  RouterModule.forRoot([]),
                ],
      declarations: [PurchasedSolutionDetailsComponent],
      providers: [
                    SolutionService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
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
