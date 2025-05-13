import axios, { AxiosInstance } from 'axios';

// Crear una instancia de axios
const instance: AxiosInstance = axios.create({
  baseURL: 'https://erp-backend-i9ej.onrender.com/', // Cambia esto por la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar un interceptor para el token de autenticación
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtener el token desde el almacenamiento
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;