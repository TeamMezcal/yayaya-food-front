import { MealListComponent } from './components/meals/meal-list/meal-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { IsauthGuard } from './shared/guards/isauth.guard';
import { IsNotAuthGuard } from './shared/guards/is-not-auth.guard';
import { ReviewsComponent } from './components/reviews/reviews.component';

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch:"full"},
  {path: 'login', canActivate:[IsNotAuthGuard] ,component: LoginComponent},
  {path: 'register', canActivate:[IsNotAuthGuard] ,component: RegisterComponent},
  //{path: 'login/register', redirectTo: "register"},
  {path: 'mealsList', canActivate: [IsauthGuard], component: MealListComponent},
  {path: 'reviews', canActivate: [IsauthGuard], component: ReviewsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
