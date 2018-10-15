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
  


}