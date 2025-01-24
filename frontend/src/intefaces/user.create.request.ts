import type { ERole } from "./role.enum";

export interface UserCreateRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: ERole[];
    birthday: Date;
}