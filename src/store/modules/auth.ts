import { Module } from 'vuex';
import { AuthState, User } from '../../types/interfaces';
import * as authService from '../../services/authService';
import * as accountsService from '../../services/accountsService';

const authModule: Module<AuthState, any> = {
  namespaced: true,

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
      const token = await authService.login(credentials);
      commit('setToken', token);
      localStorage.setItem('token', token);
      authService.setAuthHeader(token);

      const user = await accountsService.getCurrentUser();
      commit('setUser', user);
    },

    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
      localStorage.removeItem('token');
      authService.clearAuthHeader();
    },
  },
};

export default authModule;