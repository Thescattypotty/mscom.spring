import type { ERole } from "./role.enum";

export interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: ERole[];
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
}