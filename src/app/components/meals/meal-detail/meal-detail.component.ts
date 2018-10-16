import { Meal } from './../../../shared/models/meal.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealService } from 'src/app/shared/services/meal.service';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {
  meal: Meal = new Meal();
  constructor(
    private mealsService: MealService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        map((params => params.id)),
        switchMap(id => this.mealsService.getMealDetail(id))
      )
      .subscribe((meal: Meal) => this.meal = meal);
  };
}
