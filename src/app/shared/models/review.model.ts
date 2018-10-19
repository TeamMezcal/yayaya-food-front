import { User } from './user.model';
import { Meal } from './meal.model';

export class Review {
  id?: string;
  title: string;
  content: string;
  rating: number;
  meal?: Meal = new Meal();
  user?: User = new User();
  createdAt?: Date;
  
  public asFormData(): FormData {
    const data = new FormData();

    data.append('title', this.title);
    data.append('content', this.content);
   //data.append('User', this.user)
    //data.append(rating: Number, this.rating);
    
    // for (const tag of this.tags) {
    //   data.append('tags', tag);
    // }
    
    // for (const imageFile of this.imageFiles) {
    //   data.append('images', imageFile);
    // }

    return data;
  }

}