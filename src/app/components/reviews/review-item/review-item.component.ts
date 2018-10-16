import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
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
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() review: Review = new Review();
  authUser: User = new User();
  onAuthUserChanges: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;
    this.onAuthUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => this.authUser = user);
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }


  onClickPost() {
    console.log(this.review);
    this.router.navigate(['/meals', this.review.meal,'reviews' ]);
  }

}
