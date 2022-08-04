import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';
import users from './modules/users';

export default createStore({
  modules: {
    auth,
    users,
  },
  plugins: [createPersistedState()],
});
