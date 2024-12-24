import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { User } from '../../model/user.model';
import { UserService } from '../../services/userService/user.service';
import { BookReview } from '../../model/review.model';
import { BookReviewService } from '../../services/BookReviewService/reviews.service';
import { AvgRatingDTO } from '../../model/avgrating.dto';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router,private bookReviewService: BookReviewService,  private userService: UserService, private authService: AuthService) {}

  userId: string | null = null;
  userDetails: User | null = null;
  // reviews: BookReview[] = [];
  averageRatings: AvgRatingDTO[] = [];
  filteredRatings: AvgRatingDTO[] = [];
  filterText: string = '';

  ngOnInit(): void {
    this.userId= this.authService.getUserIdFromToken();
    console.log('User ID from token:', this.userId);
    if (this.userId) {
      // If userId is available, fetch user details by username or userId
      this.fetchUser(this.userId);
    }
    // this.fetchReviews();
    this.fetchAverageRatings();
  }

  goToPage(): void {
    this.router.navigateByUrl('allreviews');
  }

  fetchAverageRatings(): void {
    this.bookReviewService.getAverageRatings().subscribe({
      next: (data) => {
        this.averageRatings = data;
        this.filteredRatings = [...data];
        console.log("Fetched average ratings :", data);
      },
      error: (error) => {
        console.error('Error fetching average ratings:', error);
      }
    });
  }

  // fetchReviews(): void {
  //   this.bookReviewService.getReviews().subscribe(
  //     (reviews: BookReview[]) => {
  //       this.reviews = reviews;
  //       console.log('Fetched reviews:', reviews);
  //     },
  //     (error) => {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   );
  // }

  fetchUser(userId: string): void {
    this.userService.getUserByUsername(userId).subscribe(
      (user: User) => {
        this.userDetails = user; 
        console.log('Fetched user details:', user);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


  filterRatings(): void {
    this.filteredRatings = this.averageRatings.filter((rating) =>
      rating.bookTitle.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

}
