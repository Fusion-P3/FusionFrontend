import { TestBed } from '@angular/core/testing';

import { LeetcodeService } from './leetcode.service';

describe('LeetcodeService', () => {
  let service: LeetcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeetcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
