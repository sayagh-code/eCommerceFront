import { Category } from "./category.model";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: Category;
    image: string;
}