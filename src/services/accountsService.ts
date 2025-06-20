import axios from '../services/axios';
import { User, PaginatedResponse } from '../types/interfaces';

// Interfaz para la respuesta de validación
interface ValidateUserFieldResponse {
  valid: boolean;
  message?: string;
  error_code?: 'required' | 'tooShort' | 'tooLong' | 'invalidFormat' | 'duplicate' | 'error';
  error?: string;
}

// Validar nombre de usuario
export async function validateUserField(data: {[key: string] : string}): Promise<ValidateUserFieldResponse> {
  try {
    const response = await axios.post<ValidateUserFieldResponse>('/api/accounts/users/validate/', data);
    return response.data;
  } catch (error) {
    console.error('Failed to validate user field:', error);
    return {
      valid: false,
      error_code: 'error',
      error: 'Error al conectar con el servidor.',
    };
  }
}

// Obtener el usuario actual
export async function getCurrentUser(): Promise<User> {
  try {
    const response = await axios.get<User>('/api/accounts/me/');
    return response.data;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw new Error('Failed to get current user');
  }
}

// Obtener lista paginada de usuarios
export async function getUsers(params?: Record<string, any>): Promise<PaginatedResponse<User>> {
  try {
    const response = await axios.get<PaginatedResponse<User>>('/api/accounts/users/', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error);
    throw new Error('Failed to get users');
  }
}

// Crear nuevo usuario
export async function createUser(userData: Partial<User>): Promise<User> {
  try {
    const response = await axios.post<User>('/api/accounts/users/', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error('Failed to create user');
  }
}

// Actualizar un usuario existente
export async function updateUser(userId: number | string, userData: Partial<User>): Promise<User> {
  try {
    const response = await axios.patch<User>(`/api/accounts/users/${userId}/`, userData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update user with ID ${userId}:`, error);
    throw new Error('Failed to update user');
  }
}

// Eliminar un usuario
export async function deleteUser(userId: number | string): Promise<void> {
  try {
    await axios.delete(`/api/accounts/users/${userId}/`);
  } catch (error) {
    console.error(`Failed to delete user with ID ${userId}:`, error);
    throw new Error('Failed to delete user');
  }
}