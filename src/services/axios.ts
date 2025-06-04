import axios, { AxiosInstance } from 'axios';

// Crear instancia
const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token a cada request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar 401 y renovar token
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verificamos si fue un 401 y no estamos ya reintentando
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem('refreshToken');
      if (refresh) {
        try {
          // Pedimos nuevo token
          const res = await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/refresh/`, {
            refresh,
          });

          const newAccess = res.data.access;
          localStorage.setItem('accessToken', newAccess);

          // Actualizamos header y reintentamos
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Si falla la renovación, redirigimos a login o limpiamos storage
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // o router.push si usás Vue Router
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;