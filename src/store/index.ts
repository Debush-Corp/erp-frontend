import { createStore } from 'vuex';
import auth from './modules/auth';
import accounts from './modules/accounts';

const store = createStore({
  modules: {
    auth,
    accounts,
  },
});

export default store;