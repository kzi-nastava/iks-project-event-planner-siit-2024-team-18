import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NotificationManagerService } from './notification-manager.service';

describe('NotificationManagerService', () => {
  let service: NotificationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            NotificationManagerService,
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
    service = TestBed.inject(NotificationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
