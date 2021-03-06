import { MealFormComponent } from './components/meals/meal-form/meal-form.component';
import { MealCreateComponent } from './components/meals/meal-create/meal-create.component';
import { MealDetailComponent } from './components/meals/meal-detail/meal-detail.component';
import { MealListComponent } from './components/meals/meal-list/meal-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/misc/login/login.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { IsauthGuard } from './shared/guards/isauth.guard';
import { IsNotAuthGuard } from './shared/guards/is-not-auth.guard';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component';
import { SuccessComponent } from './components/misc/success/success.component';
import { MapsViewComponent } from './components/misc/maps-view/maps-view.component';

const routes: Routes = [
  {path: '', redirectTo: "login", pathMatch:"full"},
  {path: 'login', canActivate:[IsNotAuthGuard] ,component: LoginComponent},
  {path: 'register', canActivate:[IsNotAuthGuard] ,component: RegisterComponent},
  //{path: 'login/register', redirectTo: "register"},
  {path: 'meals', canActivate: [IsauthGuard], component: MealListComponent},
  {path: 'meals/:id/reviews', canActivate: [IsauthGuard], component: ReviewListComponent},
  {path: 'meals/:id', canActivate: [IsauthGuard], component: MealDetailComponent},
  {path: 'success', canActivate: [IsauthGuard], component: SuccessComponent},
  {path: 'maps-view', canActivate: [IsauthGuard], component: MapsViewComponent},
  {path: 'meal-create', canActivate: [IsauthGuard], component: MealCreateComponent},
  {path: 'meal-form', canActivate: [IsauthGuard], component: MealFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
