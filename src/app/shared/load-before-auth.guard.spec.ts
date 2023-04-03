import { TestBed } from '@angular/core/testing';

import { LoadBeforeAuthGuard } from './load-before-auth.guard';

describe('LoadBeforeAuthGuard', () => {
  let guard: LoadBeforeAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadBeforeAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
