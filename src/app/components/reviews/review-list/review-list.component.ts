import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MealService } from '../../../shared/services/meal.service';
import { Meal } from '../../../shared/models/meal.model';
import { User } from '../../../shared/models/user.model';
import { Review } from '../../../shared/models/review.model';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ReviewService } from '../../../shared/services/review.service'


@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnDestroy {
  @Input() reviews: Array<Review> = [];
 
  onReviewChangesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    //private mealService: MealService,
    private reviewService: ReviewService) { }

  ngOnInit() {

    this.route.params.pipe(
    map(params => params.id),
    switchMap(mealId => this.reviewService.list(mealId))
  ).subscribe((reviews : Array<Review>) => this.reviews = reviews);

  this.onReviewChangesSubscription = this.reviewService.onReviewsChanges()
  .subscribe((reviews: Array<Review>)=> this.reviews = reviews);
  }

  ngOnDestroy() {
    this.onReviewChangesSubscription.unsubscribe();
  }


  onClickPost() {

  }

}
