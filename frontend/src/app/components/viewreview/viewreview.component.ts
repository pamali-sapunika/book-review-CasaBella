import { Component, OnInit  } from '@angular/core';
import { BookReview } from '../../model/review.model';
import { BookReviewService } from '../../services/BookReviewService/reviews.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-viewreview',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './viewreview.component.html',
  styleUrl: './viewreview.component.css'
})
export class ViewreviewComponent implements OnInit{

  reviewId!: number;
  review!: BookReview;
  formattedDate!: string;

  constructor(private route: ActivatedRoute, private bookReviewService: BookReviewService, private router: Router) { }

  ngOnInit(): void {
    this.reviewId = +this.route.snapshot.paramMap.get('reviewId')!;
    this.getReviewDetails();
  }

  getReviewDetails(): void {
    this.bookReviewService.getReviewById(this.reviewId).subscribe({
      next: (review) => {
        this.review = review;
        this.formattedDate = this.formatDate(new Date(review.reviewDate));
      },
      error: (error) => {
        console.error('Error fetching single review data, error');
      }
    });
  }

  editReview(): void{
    this.router.navigate(['editreview', this.reviewId]);
    
  }

  deleteReview(): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.bookReviewService.deleteReview(this.reviewId).subscribe({
        next: () => {
          console.log('Review with id ' + this.reviewId + ' deleted successfully');
          this.router.navigate(['/allReviews']);
        },
        error: (err) => console.error('Error deleting review:', err),
      });
    }
  }

  
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
