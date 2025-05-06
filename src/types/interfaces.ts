// Respuesta de login (token de acceso y refresco)
export interface LoginResponse {
    access: string;  // Token de acceso
    refresh: string; // Token de refresco
}

// Información básica del usuario
export interface User {
    id: number;
    username: string;
    groups: string[];
}

// Estado de autenticación
export interface AuthState {
    user: User | null;    // El usuario puede estar autenticado o no
    token: string | null;  // El token de acceso puede ser null si no hay sesión activa
}