import { TestBed } from '@angular/core/testing';

import { BookReviewService } from './reviews.service';

describe('HotelsService', () => {
  let service: BookReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
