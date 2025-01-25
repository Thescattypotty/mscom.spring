/* eslint-disable perfectionist/sort-imports */
// eslint-disable-next-line import/no-extraneous-dependencies
import type { AxiosResponse } from "axios";
import axios from "axios";
import axiosInstance from "src/interceptor/AxiosInstance";
import type { JwtResponse, LoginRequest, UserCreateRequest } from "src/intefaces";

const REST_API_URL = "http://localhost:8222/api/v1/auth";

export const signIn = async (loginRequest: LoginRequest): Promise<AxiosResponse<JwtResponse>> =>
    axios.post(`${REST_API_URL}/login`, loginRequest);

export const signUp = async (registerRequest: UserCreateRequest): Promise<AxiosResponse<void>> =>
    axios.post(`${REST_API_URL}/register`, registerRequest);

export const signOut = async (): Promise<AxiosResponse<void>> => 
    axiosInstance.post(`${REST_API_URL}/logout`);