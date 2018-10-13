import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './../../../shared/services/session.service';
import { Meal } from './../../../shared/models/meal.model';
import { User } from './../../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MealsService } from './../../../shared/services/meal.service'


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class MealItemComponent implements OnInit, OnDestroy {
  @Input() meal: Meal = new Meal();
  authUser: User = new User();
  onAuthUserChanges: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private mealsService: MealsService) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;
    this.onAuthUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => this.authUser = user);
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }


  onClickPost() {
    console.log(this.meal);
    this.router.navigate(['/users', this.meal.user, 'meals', this.meal.id]);
  }

}