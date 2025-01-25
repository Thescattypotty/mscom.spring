/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import axiosInstance from "src/interceptor/AxiosInstance";
import type { Pageable, UserRequest, UserResponse } from "src/intefaces";
import type { PeagableResponse } from "src/intefaces/peagable.response";
import type { AxiosResponse } from "axios";


const REST_API_URL = "users";

export const listUsers = async (pageable: Pageable): Promise<AxiosResponse<PeagableResponse<UserResponse>>> => 
    axiosInstance.get(REST_API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sortBy: pageable.sortBy,
            order: pageable.order
        }
    });
export const createUser = async (user: UserRequest): Promise<AxiosResponse<void>> => 
    axiosInstance.post(REST_API_URL, user);

export const updateUser = async (id: string, user: UserRequest): Promise<AxiosResponse<void>> =>
    axiosInstance.put(`${REST_API_URL}/${id}`, user);

export const deleteUser = async (id: string): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`${REST_API_URL}/${id}`);

export const getUser = async (id: string): Promise<AxiosResponse<UserResponse>> =>
    axiosInstance.get(`${REST_API_URL}/${id}`);