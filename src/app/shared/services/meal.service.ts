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
export class MealService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;
  private static readonly MEALS_API = `${BaseApiService.BASE_API}/meals`;

  private meals: Array <Meal> = [];
  private mealSubject: Subject <Array<Meal>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(userId: string): Observable <Array<Meal> | ApiError > {
    console.log("user id ------->", userId)
    return this.http.get<Array<Meal>>(`${MealService.USER_API}/${userId}${MealService.MEALS_API}`, BaseApiService.defaultOptions)
      .pipe(
        map((meals: Array<Meal>) => {
          meals = meals.map(meal => Object.assign(new Meal(), meal));
          this.meals = meals;
          this.notifyMealChanges();
          return meals;
        }),
        catchError(this.handleError)
      );
  }

  listAllMeals(): Observable <Array<Meal> | ApiError > {
    console.log("ENTRO EN LIST ALL MEALS DEL SERVICIO")
    return this.http.get<Array<Meal>>(`${MealService.MEALS_API}`, BaseApiService.defaultOptions)
    .pipe(
      map((meals: Array<Meal>) => {
        meals = meals.map(meal => Object.assign(new Meal(), meal));
        this.meals = meals; 
        this.notifyMealChanges(); 
        return meals; 
      }), 
      catchError(this.handleError)
    ); 

  }

  get(userId: string, id: String): Observable<Meal | ApiError> {
    return this.http.get<Meal>(`${MealService.USER_API}/${userId}${MealService.MEALS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((meal: Meal) => Object.assign(new Meal(), meal)),
        catchError(this.handleError));
  }

  getMealDetail(id: string): Observable<Meal | ApiError> {
    return this.http.get<Meal>(`${MealService.MEALS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((meal: Meal) => Object.assign(new Meal(), meal)),
        catchError(this.handleError));
  }



  create(meal: Meal): Observable < Meal | ApiError > {
    return this.http.post<Meal>(`${MealService.USER_API}/${MealService.MEALS_API}`, meal.asFormData(), { withCredentials: true })
      .pipe(
        map((meal: Meal) => {
          meal = Object.assign(new Meal(), meal);
          this.meals.push(meal);
          this.notifyMealChanges();
          return meal;
        }),
        catchError(this.handleError));
  }

  delete(userId: string, id: string): Observable < void | ApiError > {
    return this.http.delete<void>(`${MealService.USER_API}/${userId}${MealService.MEALS_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.meals = this.meals.filter(u => u.id !== id);
          this.notifyMealChanges();
        }),
        catchError(this.handleError)
      );
  }

  onMealChanges(): Observable < Array < Meal >> {
    return this.mealSubject.asObservable();
  }

  private notifyMealChanges(): void {
    this.mealSubject.next(this.meals);
  }
}