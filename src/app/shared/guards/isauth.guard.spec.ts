import { TestBed, async, inject } from '@angular/core/testing';

import { IsauthGuard } from './isauth.guard';

describe('IsauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsauthGuard]
    });
  });

  it('should ...', inject([IsauthGuard], (guard: IsauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
