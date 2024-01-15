import { TestBed } from '@angular/core/testing';

import { RecommendationSystemService } from './recommendation-system.service';

describe('RecommendationSystemService', () => {
  let service: RecommendationSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendationSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
