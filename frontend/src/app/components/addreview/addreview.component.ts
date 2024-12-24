import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BookReview } from '../../model/review.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookReviewService } from '../../services/BookReviewService/reviews.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-addreview',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule, 
    MatNativeDateModule,
  ],
  templateUrl: './addreview.component.html',
  styleUrl: './addreview.component.css'
})
export class AddReviewComponent {

  reviewForm: FormGroup;
  currentDate = this.getCurrentDate();
  reviews: BookReview[] = [];
  bookTitles: string[] = [];
  showCustomBookInput = false;

  constructor(private fb: FormBuilder, private bookReviewService: BookReviewService, private router: Router) {
    this.reviewForm = this.fb.group({
      bookTitle: ['', Validators.required],
      author: ['', [Validators.required]],
      rating: ['', Validators.required],
      reviewText: ['', Validators.required],
      reviewDate: [this.getCurrentDate(), Validators.required],
    });
  }

  onSubmit(): void {
    console.log('review creation method called');
    if (this.reviewForm.valid) {
      const newReview: BookReview = this.reviewForm.value;
      this.bookReviewService.addReview(newReview).subscribe({
        next: (response) => {
          console.log('Review added successfully', response);
          alert("Review added successfully");
          this.router.navigateByUrl('allReviews')
        },
        error: (error) => {
          console.error('Error adding review:', error);
        }
      });
    }
  }

  // onSubmit(): void {
  //   if (this.reviewForm.valid) {
  //     let bookTitle = this.reviewForm.value.bookTitle;

  //     // Use the custom book title if provided
  //     if (this.showCustomBookInput && this.reviewForm.value.customBookTitle) {
  //       bookTitle = this.reviewForm.value.customBookTitle;
  //     }

  //     const newReview: BookReview = {
  //       ...this.reviewForm.value,
  //       bookTitle,
  //     };

  //     this.bookReviewService.addReview(newReview).subscribe({
  //       next: (response) => {
  //         console.log('Review added successfully', response);
  //         alert('Review added successfully');
  //         this.router.navigateByUrl('allReviews');
  //       },
  //       error: (error) => {
  //         console.error('Error adding review:', error);
  //       },
  //     });
  //   }
  // }


  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    this.bookReviewService.getReviews().subscribe(
      (reviews: BookReview[]) => {
        this.reviews = reviews;
        this.bookTitles = this.getUniqueBookTitles(reviews);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  getUniqueBookTitles(reviews: BookReview[]): string[] {
    const titles = reviews.map((review) => review.bookTitle);
    return Array.from(new Set(titles));
  }

  // handleBookTitleChange(event: any): void {
  //   this.showCustomBookInput = event.value === 'custom';
  //   if (!this.showCustomBookInput) {
  //     this.reviewForm.get('customBookTitle')?.setValue('');
  //   }
  // }

  private getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
