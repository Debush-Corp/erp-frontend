import axios from '../services/axios';
import { LoginResponse } from '../types/interfaces';

export async function login(credentials: { username: string; password: string }): Promise<{ access: string; refresh: string }> {
  try {
    console.log(`Credentials: ${JSON.stringify(credentials)}`);
    const response = await axios.post<LoginResponse>('/api/auth/login/', credentials);
    return { access: response.data.access, refresh: response.data.refresh };
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed');
  }
}

export function setAuthHeader(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function clearAuthHeader() {
  delete axios.defaults.headers.common['Authorization'];
}