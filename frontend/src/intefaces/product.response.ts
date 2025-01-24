import type { ECategory } from "./category.enum";

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    category: ECategory;
    imageUrl: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}