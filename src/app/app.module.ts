import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/misc/header/header.component';
import { FooterComponent } from './components/misc/footer/footer.component';
import { RegisterComponent } from './components/misc/register/register.component';
import { LoginComponent } from './components/misc/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MealItemComponent } from './components/meals/meal-item/meal-item.component';
import { MealListComponent } from './components/meals/meal-list/meal-list.component';
import { MealDetailComponent } from './components/meals/meal-detail/meal-detail.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MealCreateComponent } from './components/meals/meal-create/meal-create.component';
import { MealFormComponent } from './components/meals/meal-form/meal-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    MealItemComponent,
    MealListComponent,
    MealDetailComponent,
    ReviewsComponent
    MealCreateComponent,
    MealFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
