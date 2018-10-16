import { ReviewFormComponent } from './../review-form/review-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from './../../../shared/models/meal.model';
import { Review } from './../../../shared/models/review.model';
import { ReviewService } from '../../../shared/services/review.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html'
})
export class ReviewCreateComponent implements OnInit {
  @ViewChild(ReviewFormComponent) reviewFormComponent: ReviewFormComponent;
  reviewId: string;
  mealId: string;

  constructor(
    private routes: ActivatedRoute,
    private reviewsService: ReviewService) { }

  
  ngOnInit() {
    this.routes.params.subscribe(params => this.mealId = params.mealId);
  }

  onSubmitCreateReviewForm(review: Review): void {
    this.reviewsService.create(this.reviewId, review)
      .subscribe((review: Review) => {
        this.reviewFormComponent.reset();
      });
  }

  canDeactivate(): boolean {
    return this.reviewFormComponent.canDeactivate();
  }
}
