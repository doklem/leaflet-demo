import { TestBed } from '@angular/core/testing';

import { WalkwayService } from './walkway.service';

describe('WalkwayService', () => {
  let service: WalkwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalkwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
