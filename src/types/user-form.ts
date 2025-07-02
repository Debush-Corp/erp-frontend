import { UserRol } from "./user-rol.interfaces";

export interface FormUserCreateData {
    username: string,
    password: string,
    document: string,
    group_ids: number[]
}

export interface FormUserUpdateData {
    username?: string,
    password?: string,
    document?: string,
    group_ids?: number[]
}