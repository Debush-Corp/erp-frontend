import axios from '../services/axios';

export interface PasswordOptions {
  length: number;
  use_uppercase?: boolean;
  use_lowercase?: boolean;
  use_digits?: boolean;
  use_special?: boolean;
}

export async function generatePassword(options: PasswordOptions): Promise<string> {
  try {
    const response = await axios.post('/api/password/generate/', options);
    return response.data.password; // La vista devuelve {"password": "..."}
  } catch (error: any) {
    console.error('Failed to generate password:', error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to generate password');
  }
}