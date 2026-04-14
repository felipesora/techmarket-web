import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminMatchGuard } from './admin-match-guard';

describe('adminMatchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
