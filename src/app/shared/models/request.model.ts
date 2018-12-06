import { User } from './user.model';

export class Request {
    id?: string;
    name: string;
    coordinates: Array<number> = [];
    address: string;
    description: string;
    price: number;
    portions: number;
    techniques: Array<string> = [];
    ingredients : Array <string> = [];
    poster? : User = new User();
    createdAt?: Date;

    public asFormData() : FormData{
        const data = new FormData();
        data.append('name', this.name);
        data.append('address', this.address);
        data.append('description', this.description);
        data.append('price', this.price.toString());
        data.append('portions', this.portions.toString())

        for (const ingredient of this.ingredients){
            data.append('ingredients', ingredient)
        };
        for(const technique of this.techniques){
            data.append('techniques', technique)
        };
        return data

    }
     


}