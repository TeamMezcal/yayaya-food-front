import { MealFormComponent } from './../meal-form/meal-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from './../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meal.service';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html'
})
export class MealCreateComponent implements OnInit {
  @ViewChild(MealFormComponent) mealFormComponent: MealFormComponent;
  userId: string;

  constructor(
    private routes: ActivatedRoute,
    private mealService: MealsService) { }

  
  ngOnInit() {
    this.routes.params.subscribe(params => this.userId = params.userId);
  }

  onSubmitCreatePostForm(meal: Meal): void {
    this.mealService.create(this.userId, meal)
      .subscribe((meal: Meal) => {
        this.mealFormComponent.reset();
      });
  }

  canDeactivate(): boolean {
    return this.mealFormComponent.canDeactivate();
  }
}