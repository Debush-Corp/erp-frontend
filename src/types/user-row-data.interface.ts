import { UserDate } from "./dates.interface";
import { UserRol } from "./user-rol.interfaces";

export interface DataRowUser {
    id: string;
    username: string;
    firstname: string;
    name: string;
    email: string;
    document: string;
    dateJoined: UserDate;
    isActive: boolean;
    lastLogin: UserDate;
    roles: UserRol[]
}