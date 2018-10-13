import { Meal } from './../../../shared/models/meal.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {
  meal: Meal = new Meal();
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => this.meal = data.meal);
  }

}