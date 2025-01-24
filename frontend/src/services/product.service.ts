/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import type { Pageable, ProductRequest, ProductResponse } from "src/intefaces";


const REST_API_URL = "http://localhost:8222/api/v1/products";

export const listProducts = async (pageable: Pageable): Promise<ProductResponse[]> =>
    axios.get(REST_API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sortBy: pageable.sortBy,
            order: pageable.order
        }
    });
export const createProduct = async (product: ProductRequest): Promise<void> =>
    axios.post(REST_API_URL, product);

export const updateProduct = async (id: string, product: ProductRequest): Promise<void> =>
    axios.put(`${REST_API_URL}/${id}`, product);

export const deleteProduct = async (id: string): Promise<void> =>
    axios.delete(`${REST_API_URL}/${id}`);

export const getProduct = async (id: string): Promise<ProductResponse> =>
    axios.get(`${REST_API_URL}/${id}`);