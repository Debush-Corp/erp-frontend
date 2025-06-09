// src/store/modules/password.ts
import { Module } from 'vuex';
import * as passwordService from '@/services/passwordService';

export interface PasswordState {
  password: string | null;
  loading: boolean;
  error: string | null;
}

const passwordModule: Module<PasswordState, any> = {
  namespaced: true,
  state: () => ({
    password: null,
    loading: false,
    error: null,
  }),
  mutations: {
    setPassword(state, password: string) {
      state.password = password;
    },
    setLoading(state, value: boolean) {
      state.loading = value;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
  },
  actions: {
    async generatePassword({ commit }, options: passwordService.PasswordOptions) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const password = await passwordService.generatePassword(options);
        commit('setPassword', password);
      } catch (error: any) {
        commit('setError', error.message || 'Error generating password');
      } finally {
        commit('setLoading', false);
      }
    },
  },
};

export default passwordModule;