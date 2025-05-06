// src/store/index.ts
import { createStore } from 'vuex';
import axios from '../services/axios'; /* eslint-disable */
import { LoginResponse, User, AuthState } from '../types/interfaces';
import VueJwtDecode from 'vue-jwt-decode';

function getUserFromToken(token: string): User {
  try {
    const decoded: any = VueJwtDecode.decode(token); // Decodifica el JWT usando VueJwtDecode
    return {
      id: decoded.sub,  // Suponiendo que 'sub' es el id del usuario
      username: decoded.username,  // Username del payload
      groups: decoded.groups || [],  // Grupos del payload
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return { id: 0, username: "", groups: [] };  // Retorna un usuario vacío en caso de error
  }
}

export default createStore<AuthState>({
  state: {
    user: localStorage.getItem('token')
      ? getUserFromToken(localStorage.getItem('token')!)
      : { id: -1, username: '', groups: [] }, // 🧠 Aquí restauramos el user si hay token
    token: localStorage.getItem('token') || null,
  },
  getters: {
    // Obtener el usuario actual desde el estado
    getUser(state): User | null {
      return state.user;
    },
    // Obtener el token de acceso
    getToken(state): string | null {
      return state.token;
    },
  },
  mutations: {
    // Mutación para almacenar la información del usuario
    setUser(state, user: User) {
      state.user = user;
    },
    // Mutación para almacenar el token de acceso
    setToken(state, token: string | null) {
      state.token = token;
    },
  },
  actions: {
    // Acción para hacer login
    async login({ commit }, credentials: { username: string; password: string }) {
      try {
        // Enviar la solicitud de login a la API
        const response = await axios.post<LoginResponse>('/api/auth/token/', credentials);
        // Desestructurar la respuesta y obtener el token y los datos del usuario
        const { access, refresh } = response.data;
        // Almacenar el token de acceso
        commit('setToken', access);
        // Decodificar el token y obtener el usuario
        const user = getUserFromToken(access);
        commit('setUser', user);
        // Guardar el token en localStorage para persistir la sesión
        localStorage.setItem('token', access);
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },
    // Acción para hacer logout
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      localStorage.removeItem('token');
    },
  },
});