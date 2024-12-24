import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookReviewService } from '../../services/BookReviewService/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookReview } from '../../model/review.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-editreview',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule, 
    MatNativeDateModule,

  ],
  templateUrl: './editreview.component.html',
  styleUrl: './editreview.component.css'
})
export class EditreviewComponent implements OnInit{

  reviewForm: FormGroup;
  reviewId: number | null = null;
  currentDate = this.getCurrentDate();
  originalDate: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bookReviewService: BookReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.reviewForm = this.fb.group({
      bookTitle: ['', Validators.required],
      author: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewText: ['', Validators.required],
      reviewDate: [this.currentDate, Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('reviewId');
      if (id) {
        this.reviewId = +id;
        this.loadReviewDetails(this.reviewId);
      }
    });
  }

  loadReviewDetails(reviewId: number): void {
    this.bookReviewService.getReviewById(reviewId).subscribe({
      next: (review) => {
        this.originalDate = this.formatDate(new Date(review.reviewDate));
        this.reviewForm.patchValue(review);
      },
      error: (error) => {
        console.error('Error loading review:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid && this.reviewId !== null) {
      const updatedReview: BookReview = { 
        reviewId: this.reviewId, 
        ...this.reviewForm.value,
        reviewDate: this.currentDate,
      };

      this.bookReviewService.editReview(this.reviewId, updatedReview).subscribe({
        next: (response) => {
          console.log('Review updated successfully:', response);
          alert("Review updated successfully");
          this.router.navigate(['/allReviews']); 
        },
        error: (error) => {
          console.error('Error updating review:', error);
        }
      });
    }
  }

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
