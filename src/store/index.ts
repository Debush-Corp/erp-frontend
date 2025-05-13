// src/store/index.ts
import { createStore } from 'vuex';
import axios from '../services/axios';
import { LoginResponse, User, AuthState } from '../types/interfaces';

export default createStore<AuthState>({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
  },
  getters: {
    getUser(state): User | null {
      return state.user;
    },
    getToken(state): string | null {
      return state.token;
    },
  },
  mutations: {
    setUser(state, user: User | null) {
      state.user = user ?? { id: -1, username: '', groups: [] };
    },
    setToken(state, token: string | null) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials: { username: string; password: string }) {
      try {
        const response = await axios.post<LoginResponse>('/api/auth/login/', credentials);
        const { access } = response.data;

        // Guardamos el token
        commit('setToken', access);
        localStorage.setItem('token', access);

        // Establecemos el token en headers para próximas peticiones
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

        // Obtenemos los datos del usuario desde /me/
        const userResponse = await axios.get<User>('/api/auth/me/');
        console.log(`user: ${JSON.stringify(userResponse.data)}`)
        commit('setUser', userResponse.data);
      } catch (error) {
        console.error('Login failed:', error);
        throw new Error('Login failed');
      }
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});