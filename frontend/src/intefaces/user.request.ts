import type { ERole }  from "./role.enum";

export interface UserRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: ERole[];
    birthday: Date;
}