import { TestBed, async, inject } from '@angular/core/testing';

import { IsNotAuthGuard } from './is-not-auth.guard';

describe('IsNotAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsNotAuthGuard]
    });
  });

  it('should ...', inject([IsNotAuthGuard], (guard: IsNotAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
