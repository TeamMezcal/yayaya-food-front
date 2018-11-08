import { MealFormComponent } from './../meal-form/meal-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from './../../../shared/models/meal.model';
import { MealService } from '../../../shared/services/meal.service';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html'
})
export class MealCreateComponent implements OnInit {
  @ViewChild(MealFormComponent) mealFormComponent: MealFormComponent;
  userId: string;

  constructor(
    private routes: ActivatedRoute,
    private mealService: MealService) { }

  
  ngOnInit() {
  
  }

  onSubmitCreateMealForm(meal: Meal): void {
    console.log("Entro en onSubmitCreateMealForm")

    this.mealService.create(meal)
      .subscribe((meal: Meal) => {
        this.mealFormComponent.reset();
      });
  }

  canDeactivate(): boolean {
    return this.mealFormComponent.canDeactivate();
  }
}