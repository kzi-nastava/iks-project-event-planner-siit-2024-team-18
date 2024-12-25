import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteSolutionsComponent } from './favourite-solutions.component';

describe('FavouriteSolutionsComponent', () => {
  let component: FavouriteSolutionsComponent;
  let fixture: ComponentFixture<FavouriteSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteSolutionsComponent]
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
