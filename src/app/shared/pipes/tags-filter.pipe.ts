import { Pipe, PipeTransform } from '@angular/core';
import { Meal } from './../models/meal.model'


@Pipe({
  name: 'tagsFilter'
})
export class TagsFilterPipe implements PipeTransform {

  transform(meals: Array<Meal>, pattern: string, field:string = 'tags'): Array<Meal> {
    if (!meals) {
      return [];
    }else if (!pattern){
      return meals
    };

    
    return meals.filter(f => f[field].inludes(pattern));
  }
}

