import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteEventsComponent } from './favourite-events.component';
import { EventService } from '../../services/event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavouriteEventsComponent', () => {
  let component: FavouriteEventsComponent;
  let fixture: ComponentFixture<FavouriteEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouriteEventsComponent],
      providers: [
                    EventService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
