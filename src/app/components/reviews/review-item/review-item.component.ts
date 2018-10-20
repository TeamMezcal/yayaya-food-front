import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MealService } from '../../../shared/services/meal.service';
import { Meal } from '../../../shared/models/meal.model';
import { User } from '../../../shared/models/user.model';
import { Review } from '../../../shared/models/review.model';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReviewService } from '../../../shared/services/review.service'


@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit, OnDestroy {
  @Input() review: Review = new Review();
  reviewedMeal: Meal = new Meal();
  onMealChanges: Subscription;

  constructor(
    private router: Router,
    private mealService: MealService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    // this.reviewedMeal = this.reviewService.meal;
    // this.onReviewsChanges = this.reviewService.onReviewsChanges()
    //   .subscribe((review: Review) => this.review = review);
  }

  ngOnDestroy() {
    // this.onMealChanges.unsubscribe();
  }


  onClickPost() {
    console.log(this.review);
    this.router.navigate(['/meals', this.review.meal,'reviews' ]);
  }

}
