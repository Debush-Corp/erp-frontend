import { UserRol } from "./user-rol.interfaces";

export type TableRow = UserRow | ProductRow;

export interface UserRow {
    id: number | string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    document: string;
    isActive: boolean;
    roles: UserRol[];
}

export interface ProductRow {
    id: number | string;
    name: string;
    priceInt: number | string;
    priceDecim: number | string;
    stock: number | string;
    category: string;
}

export interface TableColumn {
    id: string;
    name: string
}

export interface TableCheckbox {
    id: number | string;
    el: Element | null;
}