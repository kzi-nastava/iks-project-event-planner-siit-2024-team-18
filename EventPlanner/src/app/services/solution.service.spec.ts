import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SolutionService } from './solution.service';

describe('SolutionService', () => {
  let service: SolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            SolutionService,
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
    service = TestBed.inject(SolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
