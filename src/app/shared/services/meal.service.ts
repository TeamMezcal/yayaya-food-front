import { Meal } from '../models/meal.model';
import { ApiError } from '../models/apiError.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MealsService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;
  private static readonly MEALS_API = `/meals`;

  private meals: Array <Meal> = [];
  private mealsSubject: Subject <Array<Meal>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(userId: string): Observable <Array<Meal> | ApiError > {
    return this.http.get<Array<Meal>>(`${MealsService.USER_API}/${userId}${MealsService.MEALS_API}`, BaseApiService.defaultOptions)
      .pipe(
        map((meals: Array<Meal>) => {
          meals = meals.map(meal => Object.assign(new Meal(), meal));
          this.meals = meals;
          this.notifyMealsChanges();
          return meals;
        }),
        catchError(this.handleError)
      );
  }

  get(userId: string, id: String): Observable<Meal | ApiError> {
    return this.http.get<Meal>(`${MealsService.USER_API}/${userId}${MealsService.MEALS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((meal: Meal) => Object.assign(new Meal(), meal)),
        catchError(this.handleError));
  }

  create(userId: string, meal: Meal): Observable < Meal | ApiError > {
    return this.http.post<Meal>(`${MealsService.USER_API}/${userId}${MealsService.MEALS_API}`, meal.asFormData(), { withCredentials: true })
      .pipe(
        map((meal: Meal) => {
          meal = Object.assign(new Meal(), meal);
          this.meals.push(meal);
          this.notifyMealsChanges();
          return meal;
        }),
        catchError(this.handleError));
  }

  delete(userId: string, id: string): Observable < void | ApiError > {
    return this.http.delete<void>(`${MealsService.USER_API}/${userId}${MealsService.MEALS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.meals = this.meals.filter(u => u.id !== id);
          this.notifyMealsChanges();
        }),
        catchError(this.handleError)
      );
  }

  onMealsChanges(): Observable < Array < Meal >> {
    return this.mealsSubject.asObservable();
  }

  private notifyMealsChanges(): void {
    this.mealsSubject.next(this.meals);
  }
}