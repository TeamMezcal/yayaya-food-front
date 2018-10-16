import { MealDetailComponent } from './components/meals/meal-detail/meal-detail.component';
import { MealListComponent } from './components/meals/meal-list/meal-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { IsauthGuard } from './shared/guards/isauth.guard';
import { IsNotAuthGuard } from './shared/guards/is-not-auth.guard';
import { ReviewComponent } from './components/reviews/review-item/review-item.component';

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch:"full"},
  {path: 'login', canActivate:[IsNotAuthGuard] ,component: LoginComponent},
  {path: 'register', canActivate:[IsNotAuthGuard] ,component: RegisterComponent},
  //{path: 'login/register', redirectTo: "register"},
  {path: 'mealsList', canActivate: [IsauthGuard], component: MealListComponent},
  {path: 'reviews', canActivate: [IsauthGuard], component: ReviewComponent},
  {path: 'meals/:id', canActivate: [IsauthGuard], component: MealDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
