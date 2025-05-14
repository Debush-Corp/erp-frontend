import axios, { AxiosInstance } from 'axios';

// Crear una instancia de axios
const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
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