import { User } from './user.model';

export class Meal {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: Array<string> = [];
  tags: Array<string> = [];
  ingredients: Array<string> = [];
  portions: number;
  user?: User = new User();
  createdAt?: Date;
  imageFiles: Array<File> = [];

  public asFormData(): FormData {
    const data = new FormData();

    data.append('name', this.name);
    data.append('content', this.description);
    
    for (const tag of this.tags) {
      data.append('tags', tag);
    }
    
    for (const imageFile of this.imageFiles) {
      data.append('images', imageFile);
    }

    return data;
  }
}