import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookReview } from '../../model/review.model';
import { AvgRatingDTO } from '../../model/avgrating.dto';

@Injectable({
  providedIn: 'root'
})
export class BookReviewService {

  private baseUrl = 'http://localhost:8080/v1/reviews';
  

  constructor(private http: HttpClient) {}

  // Get all reviews
  getReviews(): Observable<BookReview[]> {
    return this.http.get<BookReview[]>(`${this.baseUrl}/`);
  }

  //Add reviews
  addReview(review: BookReview): Observable<BookReview>{
    return this.http.post<BookReview>(`${this.baseUrl}/`, review);
  }

  // Get a single review by its ID
  getReviewById(reviewId: number): Observable<BookReview> {
    return this.http.get<BookReview>(`${this.baseUrl}/${reviewId}`);
  }

  getAverageRatings(): Observable<AvgRatingDTO[]> {
    return this.http.get<AvgRatingDTO[]>(`${this.baseUrl}/avg-rating`);
  }

  //Edit review by Id
  editReview(reviewId: number, review: BookReview): Observable<BookReview>{
    return this.http.patch<BookReview>(`${this.baseUrl}/${reviewId}`, review);
  }

  // Delete a review by its ID
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${reviewId}`);
  }

  
}
