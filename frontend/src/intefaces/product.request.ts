import type { ECategory } from "./category.enum";

export interface ProductRequest {
    name: string;
    description: string;
    category: ECategory;
    imageUrl: string;
    price: number;
}