import type { AxiosResponse } from "axios";
import type { Pageable, OrderRequest, OrderResponse, PeagableResponse } from "src/intefaces";

import axiosInstance from "src/interceptor/AxiosInstance";


const REST_API_URL = "orders";

export const listOrders = async (pageable: Pageable): Promise<AxiosResponse<PeagableResponse<OrderResponse>>> =>
    axiosInstance.get(REST_API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sortBy: pageable.sortBy,
            order: pageable.order
        }
    });

export const createOrder = async (order: OrderRequest): Promise<AxiosResponse<OrderResponse>> =>
    axiosInstance.post(REST_API_URL, order);

export const updateOrder = async (id: string ,order: OrderRequest): Promise<AxiosResponse<OrderResponse>> =>
    axiosInstance.put(`${REST_API_URL}/${id}`, order);

export const getOrder = async (id: string): Promise<AxiosResponse<OrderResponse>> =>
    axiosInstance.get(`${REST_API_URL}/${id}`);