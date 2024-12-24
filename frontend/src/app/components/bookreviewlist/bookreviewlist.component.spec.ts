import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewlistComponent } from './bookreviewlist.component';

describe('BookReviewlistComponent', () => {
  let component: BookReviewlistComponent;
  let fixture: ComponentFixture<BookReviewlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookReviewlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookReviewlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
