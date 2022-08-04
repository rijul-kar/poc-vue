// initial state
const state = {
  loggedIn: false,
};

// getters
const getters = {
  isLoggedIn(state: any) {
    return state.loggedIn == true;
  },
};

// actions
const actions = {
  login(context: any) {
    context.commit('login');
  },

  logout(context: any) {
    context.commit('logout');
  },
};

// mutations
const mutations = {
  login(state: any) {
    state.loggedIn = true;
  },

  logout(state: any) {
    state.loggedIn = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
