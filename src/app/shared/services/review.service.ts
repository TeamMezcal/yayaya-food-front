import { Review } from '../models/review.model';
import { ApiError } from '../models/apiError.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map, switchMap } from 'rxjs/operators';
import { Meal } from './../models/meal.model';


@Injectable({
  providedIn: 'root'
})
export class ReviewService extends BaseApiService {
  private static readonly MEAL_API = `${BaseApiService.BASE_API}/meals`;
  private static readonly REVIEWS_API = `/reviews`;

  private reviews: Array <Review> = [];
  private reviewsSubject: Subject <Array<Review>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(mealId: string): Observable <Array<Review> | ApiError > {
    console.log("HELLLOOOOOOOOOOOO", mealId)
    return this.http.get<Array<Review>>(`${ReviewService.MEAL_API}/${mealId}${ReviewService.REVIEWS_API}`, BaseApiService.defaultOptions)
      .pipe(
        map((reviews: Array<Review>) => {
          
          console.log(reviews)
          reviews = reviews.map(review => Object.assign(new Review(), review));
          this.reviews = reviews;
          
          this.notifyReviewsChanges();
          return reviews;
        }),
        catchError(this.handleError)
      );
  }

  // get(mealId: string, id: String): Observable<Review | ApiError> {
  //   return this.http.get<Review>(`${ReviewService.MEAL_API}/${mealId}${ReviewService.REVIEWS_API}/`, BaseApiService.defaultOptions)
  //     .pipe(
  //       map((review: Review) => Object.assign(new Review(), review)),
  //       catchError(this.handleError));
  // }

  create(mealId: string, review: Review): Observable < Review | ApiError > {
    return this.http.post<Review>(`${ReviewService.MEAL_API}/${mealId}${ReviewService.REVIEWS_API}`, review, { withCredentials: true })
      .pipe(
        map((review: Review) => {
          review = Object.assign(new Review(), review);
          this.reviews.push(review);
          this.notifyReviewsChanges();
          return review;
        }),
        catchError(this.handleError));
  }

  

  onReviewsChanges(): Observable < Array < Review >> {
    return this.reviewsSubject.asObservable();
  }

  private notifyReviewsChanges(): void {
    this.reviewsSubject.next(this.reviews);
  }
}