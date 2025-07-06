import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypesComponent } from './event-types.component';
import { EventTypeService } from '../../services/event-type.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MaterialModule } from '../../infrastructure/material/material.module';

describe('EventTypesComponent', () => {
  let component: EventTypesComponent;
  let fixture: ComponentFixture<EventTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
                        MaterialModule
                      ],
      declarations: [EventTypesComponent],
      providers: [
                    EventTypeService,
                    provideHttpClient(),
                    provideHttpClientTesting(),
                  ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
