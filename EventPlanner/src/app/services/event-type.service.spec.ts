import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EventTypeService } from './event-type.service';

describe('EventTypeService', () => {
  let service: EventTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventTypeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(EventTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
