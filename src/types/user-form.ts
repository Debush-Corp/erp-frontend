import { UserRol } from "./user-rol.interfaces";

export interface FormUserCreateData {
    username: string,
    password: string,
    document: string,
    groups_id: number[]
}

export interface FormUserUpdateData {
    username?: string,
    password?: string,
    document?: string,
    groups_id?: number[]
}