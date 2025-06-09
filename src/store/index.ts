import { createStore } from 'vuex';
import auth from './modules/auth';
import accounts from './modules/accounts';
import password from './modules/password';

const store = createStore({
  modules: {
    auth,
    accounts,
    password,
  },
});

export default store;