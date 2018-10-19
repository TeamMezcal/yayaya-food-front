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
import { MealCreateComponent } from './components/meals/meal-create/meal-create.component';
import { MealFormComponent } from './components/meals/meal-form/meal-form.component';
import { ReviewFormComponent } from './components/reviews/review-form/review-form.component';
import { ReviewListComponent } from './components/reviews/review-list/review-list.component'; 
import { ReviewItemComponent} from './components/reviews/review-item/review-item.component';
import { ReviewCreateComponent} from './components/reviews/review-create/review-create.component';
import { SuccessComponent } from './components/misc/success/success.component';
import { PriceFilterPipe } from './shared/pipes/price-filter.pipe';
import { TagsFilterPipe } from './shared/pipes/tags-filter.pipe'


import { AgmCoreModule } from '@agm/core';
import { MapsViewComponent } from './components/misc/maps-view/maps-view.component';


// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { MealsListHeaderComponent } from './components/meals-list-header/meals-list-header.component';
import { MapButtonComponent } from './components/misc/map-button/map-button.component';
import { ListButtonComponent } from './components/misc/list-button/list-button.component';





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
    ReviewListComponent,
    MealCreateComponent,
    MealFormComponent,
    ReviewFormComponent,
    ReviewItemComponent,
    ReviewCreateComponent,
    SuccessComponent,
    PriceFilterPipe,
    TagsFilterPipe,
    MapsViewComponent,
    MealsListHeaderComponent,
    MapButtonComponent,
    ListButtonComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    OwlModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyAQk1fogZPukis0Aq-cEmt5Detd0CQHPvk",
      libraries: ['places']

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
