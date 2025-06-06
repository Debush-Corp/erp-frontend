import axios, { AxiosInstance } from 'axios';

// Cola para almacenar solicitudes mientras se refresca el token
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (reason?: any) => void;
}> = [];

// Procesar la cola de solicitudes después de renovar el token
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Crear instancia de Axios
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

    // Verificamos si fue un 401, no estamos reintentando y no es la solicitud de refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/auth/refresh/')
    ) {
      if (isRefreshing) {
        // Si ya se está refrescando el token, encola la solicitud
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refresh = localStorage.getItem('refreshToken');
        if (!refresh) {
          throw new Error('No refresh token available');
        }

        // Pedimos nuevo token
        const res = await axios.post(`${process.env.VUE_APP_API_URL}/api/auth/refresh/`, {
          refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem('accessToken', newAccess);

        // Actualizamos el header en la instancia
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;

        // Procesamos la cola de solicitudes con el nuevo token
        processQueue(null, newAccess);

        // Reintentamos la solicitud original
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Si falla la renovación, limpiamos el almacenamiento y redirigimos
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // Usar Vue Router si está disponible, si no, redirigir
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;