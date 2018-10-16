import { MealCreateComponent } from './../meal-create/meal-create.component';
import { MealService } from './../../../shared/services/meal.service';
import { Meal } from './../../../shared/models/meal.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit, OnDestroy {
  meals: Array<Meal> = [];
  onMealsChangesSubscription: Subscription;
  @ViewChild(MealCreateComponent) postCreateComponent: MealCreateComponent;

  // private route: ActivatedRoute;
  // private mealsService: MealsService;
  constructor(private route: ActivatedRoute, private mealService: MealService) {
    // this.route = route;
    // this.mealsService = mealsService
  }

  ngOnInit() {
    // this.route.params.pipe(
    //   map(params => {
    //     console.info('PARAMS --> ', params)
    //     return params.userId
    //   }),
    //   switchMap(userId => this.mealsService.list(userId))
    // ).subscribe((meals: Array<Meal>) => this.meals = meals);

    this.mealService.listAllMeals()
      .subscribe((meals: Array<Meal>) => {
        let reversedMeals = meals.reverse();
        this.meals = reversedMeals
      }); 
   


    this.onMealsChangesSubscription = this.mealService.onMealChanges()
      .subscribe((meals: Array<Meal>) => this.meals = meals);
  }

  ngOnDestroy() {
    this.onMealsChangesSubscription.unsubscribe();
  }

  // canDeactivate(): boolean {
  //   return this.mealCreateComponent.canDeactivate();
  // }

}