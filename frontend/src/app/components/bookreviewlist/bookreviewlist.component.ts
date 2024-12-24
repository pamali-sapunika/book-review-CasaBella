import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookReview } from '../../model/review.model';
import { BookReviewService } from '../../services/BookReviewService/reviews.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';  
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatDividerModule } from '@angular/material/divider';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bookreviewlist',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,   
    MatFormFieldModule,  
    MatNativeDateModule,
    MatSelectModule  
  ],
  templateUrl: './bookreviewlist.component.html',
  styleUrl: './bookreviewlist.component.css'
})
export class BookReviewlistComponent implements OnInit {

  displayedColumns: string[] = ['reviewId', 'bookTitle','author', 'rating','reviewText', 'reviewDate', 'actions'];
  dataSource: MatTableDataSource<BookReview>;
  // searchDate = new FormControl('');
  searchDate = new FormControl<Date | null>(null);  
  searchRating = new FormControl<number | null>(null);


  constructor(private bookReviewService: BookReviewService, private router: Router) {
    this.dataSource = new MatTableDataSource<BookReview>();
  }

  ngOnInit(): void {
    this.getReviews();

    this.searchDate.valueChanges.subscribe((date: Date | null) => {
      if (date) {
        this.filterReviews();
      } else {
        this.getReviews(); 
      }
    });

    this.searchRating.valueChanges.subscribe((rating: number | null) => {
      if (rating) {
        this.filterReviews();
      } else {
        this.getReviews();
      }
    });
  }

  getReviews(): void {
    this.bookReviewService.getReviews().subscribe({
      next: (reviews) => {
        this.dataSource.data = reviews;
        console.log(this.dataSource);
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  resetFilters(): void {
    // Reset the form controls
    this.searchDate.setValue(null); 
    this.searchRating.setValue(null); 
  
    // Fetch all reviews again
    this.getReviews();
  }
  

  // filterReviewsByDate(date: string): void {
  //   const filteredData = this.dataSource.data.filter((review) => {
  //     const reviewDate = this.formatDate(new Date(review.reviewDate)); // Convert to string
  //     return reviewDate.startsWith(date);
  //   });
  //   this.dataSource.data = filteredData;
  //   console.log('Filtered Reviews:', filteredData);
  // }
  

  // filterReviewsByDate(selectedDate: Date): void {
  //   const formattedSelectedDate = this.formatDate(selectedDate);  
  //   const filteredData = this.dataSource.data.filter((review) => {
  //     const reviewDate = new Date(review.reviewDate); 
  //     const formattedReviewDate = this.formatDate(reviewDate);  
  //     return formattedReviewDate === formattedSelectedDate; 
  //   });
  //   this.dataSource.data = filteredData;
  //   console.log('Filtered Reviews:', filteredData);
  // }

  filterReviews(): void {
    const selectedDate = this.searchDate.value;
    const selectedRating = this.searchRating.value;
    
    let filteredData = this.dataSource.data;

    if (selectedDate) {
      const formattedSelectedDate = this.formatDate(selectedDate);
      filteredData = filteredData.filter((review) => {
        const reviewDate = new Date(review.reviewDate);
        const formattedReviewDate = this.formatDate(reviewDate);
        return formattedReviewDate === formattedSelectedDate;
      });
    }

    if (selectedRating !== null) {
      filteredData = filteredData.filter((review) => review.rating === selectedRating);
    }

    this.dataSource.data = filteredData;
    console.log('Filtered Reviews:', filteredData);
  }
  

  editReview(reviewId: number): void {
    console.log('Editing review with ID:', reviewId);
  }

  deleteReview(reviewId: number): void {
    this.bookReviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.getReviews(); 
      },
      error: (error) => {
        console.error('Error deleting review:', error);
      }
    });
  }

  viewReview(reviewId: number): void {
    this.router.navigate(['/bookReview', reviewId]);
  }

  navigateAddReview(): void{
    this.router.navigateByUrl('addReview');
  }


  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


}
