import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rememberGuardGuard } from './remember-guard.guard';

describe('rememberGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rememberGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
