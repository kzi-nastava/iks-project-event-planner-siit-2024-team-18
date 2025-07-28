import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteSolutionsComponent } from './favourite-solutions.component';
import { SolutionService } from '../../services/solution.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavouriteSolutionsComponent', () => {
  let component: FavouriteSolutionsComponent;
  let fixture: ComponentFixture<FavouriteSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteSolutionsComponent],
      providers: [
                    SolutionService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
