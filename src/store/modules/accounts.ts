import { Module } from 'vuex';
import * as accountsService from '../../services/accountsService';
import { User, PaginatedResponse } from '../../types/interfaces';

interface AccountsState {
  users: User[];
  count: number;
  next: string | null;
  previous: string | null;
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

const accountsModule: Module<AccountsState, any> = {
  namespaced: true,

  state: {
    users: [],
    count: 0,
    next: null,
    previous: null,
    currentUser: null,
    loading: false,
    error: null,
  },

  mutations: {
    setUsers(state, users: User[]) {
      state.users = users;
    },
    setPagination(state, { count, next, previous }) {
      state.count = count;
      state.next = next;
      state.previous = previous;
    },
    setCurrentUser(state, user: User | null) {
      state.currentUser = user;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
    setError(state, error: string | null) {
      state.error = error;
    },
    addUser(state, user: User) {
      state.users.push(user);
      state.count += 1;
    },
    updateUser(state, updatedUser: User) {
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    removeUser(state, userId: number | string) {
      state.users = state.users.filter((user) => user.id !== userId);
      state.count -= 1;
    },
  },

  actions: {
    // Nueva acción para validar el field de usuario
    async validateUserField({ commit }, data: {[key: string] : string}) {
      commit('setLoading', true);
      commit('setError', null);

      try {
        const response = await accountsService.validateUserField(data);
        return response;
      } catch (err: any) {
        commit('setError', 'Error al validar el field de usuario');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },

    // Acciones existentes (sin cambios)
    async fetchUsers({ commit }, params?: Record<string, any>) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const response: PaginatedResponse<User> = await accountsService.getUsers(params);
        commit('setUsers', response.results);
        commit('setPagination', {
          count: response.count,
          next: response.next,
          previous: response.previous,
        });
        localStorage.setItem('usersData', JSON.stringify(response.results));
        return response;
      } catch (err: any) {
        commit('setError', err.message || 'Error al obtener usuarios');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchCurrentUser({ commit }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const user: User = await accountsService.getCurrentUser();
        commit('setCurrentUser', user);
        return user;
      } catch (err: any) {
        commit('setError', err.message || 'Error al obtener el usuario actual');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },

    async createUser({ commit }, userData: Partial<User>) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const newUser: User = await accountsService.createUser(userData);
        commit('addUser', newUser);
        return newUser;
      } catch (err: any) {
        commit('setError', err.message || 'Error al crear usuario');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },

    async updateUser({ commit }, { userId, userData }: { userId: number | string; userData: Partial<User> }) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        const updatedUser: User = await accountsService.updateUser(userId, userData);
        commit('updateUser', updatedUser);
        return updatedUser;
      } catch (err: any) {
        commit('setError', err.message || 'Error al actualizar usuario');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },

    async deleteUser({ commit }, userId: number | string) {
      commit('setLoading', true);
      commit('setError', null);
      try {
        await accountsService.deleteUser(userId);
        commit('removeUser', userId);
      } catch (err: any) {
        commit('setError', err.message || 'Error al eliminar usuario');
        throw err;
      } finally {
        commit('setLoading', false);
      }
    },
  },
};

export default accountsModule;