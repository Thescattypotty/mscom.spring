/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import type { Pageable, UserRequest, UserResponse } from "src/intefaces";


const REST_API_URL = "http://localhost:8222/api/v1/users";

export const listUsers = async (pageable: Pageable): Promise<UserResponse[]> => 
    axios.get(REST_API_URL, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sortBy: pageable.sortBy,
            order: pageable.order
        }
    });
export const createUser = async (user: UserRequest): Promise<void> => 
    axios.post(REST_API_URL, user);

export const updateUser = async (id: string , user: UserRequest): Promise<void> =>
    axios.put(`${REST_API_URL}/${id}`, user);

export const deleteUser = async (id: string): Promise<void> =>
    axios.delete(`${REST_API_URL}/${id}`);

export const getUser = async (id: string): Promise<UserResponse> =>
    axios.get(`${REST_API_URL}/${id}`);