import { MealCreateComponent } from './../meal-create/meal-create.component';
import { MealsService } from './../../../shared/services/meal.service';
import { Meal } from './../../../shared/models/meal.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class MealListComponent implements OnInit, OnDestroy {
  meals: Array<Meal> = [];
  onMealsChangesSubscription: Subscription;
  @ViewChild(MealCreateComponent) postCreateComponent: MealCreateComponent;

  constructor(
    private route: ActivatedRoute,
    private mealsService: MealsService) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.userId),
      switchMap(userId => this.mealsService.list(userId))
    ).subscribe((meals: Array<Meal>) => this.meals = meals);

    this.onMealsChangesSubscription = this.mealsService.onMealsChanges()
      .subscribe((posts: Array<Meal>) => this.meals = meals);
  }

  ngOnDestroy() {
    this.onMealsChangesSubscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.mealCreateComponent.canDeactivate();
  }

}