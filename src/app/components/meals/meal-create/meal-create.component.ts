import { PostFormComponent } from './../post-form/post-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from './../../../shared/models/meal.model';
import { MealsService } from '../../../shared/services/meal.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class MealCreateComponent implements OnInit {
  @ViewChild(MealFormComponent) mealFormComponent: MealFormComponent;
  userId: string;

  constructor(
    private routes: ActivatedRoute,
    private mealService: MealService) { }

  
  ngOnInit() {
    this.routes.params.subscribe(params => this.userId = params.userId);
  }

  onSubmitCreatePostForm(post: Post): void {
    this.postService.create(this.userId, post)
      .subscribe((post: Post) => {
        this.postFormComponent.reset();
      });
  }

  canDeactivate(): boolean {
    return this.postFormComponent.canDeactivate();
  }
}