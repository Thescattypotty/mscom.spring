/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import type { AxiosResponse } from "axios";
import axiosInstance from "src/interceptor/AxiosInstance";
import type { Pageable, ProductRequest, ProductResponse } from "src/intefaces";

const REST_API_URL = "products";

export const listProducts = async (pageable: Pageable): Promise<AxiosResponse<ProductResponse[]>> =>
    axiosInstance.get(REST_API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sortBy: pageable.sortBy,
            order: pageable.order
        }
    });
export const createProduct = async (product: ProductRequest): Promise<AxiosResponse<void>> =>
    axiosInstance.post(REST_API_URL, product);

export const updateProduct = async (id: string, product: ProductRequest): Promise<AxiosResponse<void>> =>
    axiosInstance.put(`${REST_API_URL}/${id}`, product);

export const deleteProduct = async (id: string): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`${REST_API_URL}/${id}`);

export const getProduct = async (id: string): Promise<AxiosResponse<ProductResponse>> =>
    axiosInstance.get(`${REST_API_URL}/${id}`);