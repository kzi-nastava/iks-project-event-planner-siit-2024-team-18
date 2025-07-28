import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopFiveEventsComponent } from './top-five-events.component';
import { EventService } from '../../../services/event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TopFiveEventsComponent', () => {
  let component: TopFiveEventsComponent;
  let fixture: ComponentFixture<TopFiveEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopFiveEventsComponent],
      providers: [
                    EventService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopFiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
