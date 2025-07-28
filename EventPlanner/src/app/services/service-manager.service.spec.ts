import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ServiceManagerService } from './service-manager.service';

describe('ServiceManagerService', () => {
  let service: ServiceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            ServiceManagerService,
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
    service = TestBed.inject(ServiceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
