import { User } from './user.model';

export class Meal {
  id?: string;
  name: string;
  coordinates: Array<number>;
  address: String;  
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
    data.append('address', (this.address).toString());
    data.append('price', (this.price).toString());
    data.append('portions', (this.portions).toString());
    data.append('coordinates', (this.coordinates).toString())
    
    for (const ingredient of this.ingredients){
      data.append('ingredients', ingredient)
    }

    for (const tag of this.tags) {
      data.append('tags', tag);
    }
    
    for (const imageFile of this.imageFiles) {
      data.append('images', imageFile);
    }

    return data;
  }
}