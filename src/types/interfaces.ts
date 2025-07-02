// Respuesta de login (token de acceso y refresco)
export interface LoginResponse {
    access: string; // Token de acceso
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
    user: User | null; // El usuario puede estar autenticado o no
    accessToken: string | null; // El token de acceso puede ser null si no hay sesión activa
    refreshToken: string | null; // El token de refresco puede ser null si no hay sesión activa
  }
  
  // Respuesta paginada genérica
  export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    page_exists: boolean; // 👈 agrégalo aquí
  }