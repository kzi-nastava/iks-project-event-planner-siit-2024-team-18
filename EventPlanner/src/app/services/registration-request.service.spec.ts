import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RegistrationRequestService } from './registration-request.service';

describe('RegistrationRequestService', () => {
  let service: RegistrationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            RegistrationRequestService,
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
    service = TestBed.inject(RegistrationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
