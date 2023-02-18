import { TestBed } from '@angular/core/testing';

import { SiteDateService } from './site-date.service';

describe('SiteDateService', () => {
  let service: SiteDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
