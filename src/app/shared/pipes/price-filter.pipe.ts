import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from './../models/meal.model';
import { max } from 'rxjs/operators';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(meals: Array<Meal>, pattern: number, field:string = 'price'): Array<Meal> {
    if (!meals) {
      return [];
    }else if (!pattern){
      return meals
    };

    function checkPrice (pattern) {
      return pattern <= max
    }
  
    return meals.filter(f => f[field].filter(checkPrice(pattern)))

  }
}

