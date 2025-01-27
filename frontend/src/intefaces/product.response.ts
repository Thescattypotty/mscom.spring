import type { ECategory } from "./category.enum";

export interface ProductResponse {
    id: string;
    name: string;
    description: string;
    category: ECategory;
    imageUrl: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}