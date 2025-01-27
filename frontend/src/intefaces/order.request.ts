import {type EOrder } from "./order.enum";

export interface OrderRequest {
    productId: string;
    quantity: number;
    status: EOrder;
}