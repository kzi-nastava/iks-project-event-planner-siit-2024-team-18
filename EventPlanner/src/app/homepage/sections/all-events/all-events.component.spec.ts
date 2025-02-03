import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventsComponent } from './all-events.component';
import { EventService } from '../../../services/event.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../../infrastructure/material/material.module';

describe('AllEventsComponent', () => {
  let component: AllEventsComponent;
  let fixture: ComponentFixture<AllEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                  MaterialModule
                ],
      declarations: [AllEventsComponent],
      providers: [
                    EventService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
