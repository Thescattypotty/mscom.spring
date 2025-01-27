import type { EOrder } from "./order.enum";

export interface OrderResponse {
    id: string;
    productId: string;
    totalPrice: number;
    quantity: number;
    status: EOrder;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}