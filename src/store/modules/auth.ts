import { Module } from 'vuex';
import store from '@/store';
import { AuthState, User } from '../../types/interfaces';
import * as authService from '../../services/authService';
import * as accountsService from '../../services/accountsService';

const authModule: Module<AuthState, any> = {
  namespaced: true,

  state: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null, // Cambiar 'token' a 'accessToken'
    refreshToken: localStorage.getItem('refreshToken') || null, // Agregar refreshToken
  },

  getters: {
    getUser(state): User | null {
      return state.user;
    },
    getAccessToken(state): string | null {
      return state.accessToken;
    },
    getRefreshToken(state): string | null {
      return state.refreshToken;
    },
  },

  mutations: {
    setUser(state, user: User | null) {
      state.user = user ?? { id: -1, username: '', groups: [] };
      // Opcional: Guardar en localStorage para persistencia
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    setTokens(state, { accessToken, refreshToken }: { accessToken: string | null; refreshToken?: string | null }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken ?? state.refreshToken; // Mantener el refreshToken actual si no se proporciona uno nuevo
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        authService.setAuthHeader(accessToken);
      } else {
        localStorage.removeItem('accessToken');
        authService.clearAuthHeader();
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      } else if (refreshToken === null) {
        localStorage.removeItem('refreshToken');
      }
    },
  },

  actions: {
    async login({ commit }, credentials: { username: string; password: string } | null) {
      let accessToken = null;
      let refreshToken = null;
      if (credentials) {
        // Login normal con credenciales
        const { access, refresh } = await authService.login(credentials);
        accessToken = access;
        refreshToken = refresh;
        commit('setTokens', { accessToken, refreshToken });
      } else {
        // Usar el token existente
        accessToken = store.getters['auth/getAccessToken'] || localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('No access token available');
        }
        commit('setTokens', { accessToken });
      }

      // Cargar datos del usuario
      const user = await accountsService.getCurrentUser();
      commit('setUser', user);
    },

    logout({ commit }) {
      commit('setTokens', { accessToken: null, refreshToken: null });
      commit('setUser', null);
      localStorage.removeItem('user');
      authService.clearAuthHeader();
    },
  },
};

export default authModule;