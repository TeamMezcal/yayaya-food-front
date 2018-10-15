import { Meal } from '../models/meal.model';
import { User } from '../models/user.model';
import { Review } from '../models/review.model';
import { ApiError } from '../models/apiError.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;
  private static readonly REVIEWS_API = `reviews`;
  private static readonly MEALS_API = `${BaseApiService.BASE_API}/meals`;

  private reviews: Array <Review> = [];
  private reviewsSubject: Subject <Array<Review>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(mealId: string): Observable <Array<Review> | ApiError > {
    return this.http.get<Array<Review>>(`${ReviewsService.MEALS_API}/${mealId}/${ReviewsService.REVIEWS_API}`, BaseApiService.defaultOptions)
      .pipe(
        map((reviews: Array<Review>) => {
          reviews = reviews.map(review => Object.assign(new Review(), review));
          this.reviews = reviews;
          this.notifyReviewsChanges();
          return reviews;
        }),
        catchError(this.handleError)
      );
  }

  get(mealId: string, id: String): Observable<Review | ApiError> {
    return this.http.get<Review>(`${ReviewsService.USER_API}/${mealId}${ReviewsService.REVIEWS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((review: Review) => Object.assign(new Review(), review)),
        catchError(this.handleError));
  }

  create(userId: string, review: Review): Observable < Review | ApiError > {
    return this.http.post<Review>(`${ReviewsService.USER_API}/${userId}${ReviewsService.REVIEWS_API}`, review, { withCredentials: true })
      .pipe(
        map((meal: Meal) => {
          review = Object.assign(new Review(), review);
          this.reviews.push(review);
          this.notifyReviewsChanges();
          return review;
        }),
        catchError(this.handleError));
  }

  delete(userId: string, id: string): Observable < void | ApiError > {
    return this.http.delete<void>(`${ReviewsService.USER_API}/${userId}${ReviewsService.REVIEWS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.reviews = this.reviews.filter(u => u.id !== id);
          this.notifyReviewsChanges();
        }),
        catchError(this.handleError)
      );
  }

  onReviewsChanges(): Observable < Array < Review >> {
    return this.reviewsSubject.asObservable();
  }

  private notifyReviewsChanges(): void {
    this.reviewsSubject.next(this.reviews);
  }
}