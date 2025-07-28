import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PricelistService } from './pricelist.service';

describe('PricelistService', () => {
  let service: PricelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          providers: [
            PricelistService,
            provideHttpClient(),
            provideHttpClientTesting(),
          ],
        });
    service = TestBed.inject(PricelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
