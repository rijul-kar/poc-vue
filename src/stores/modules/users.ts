import https from '../../https/index';
const state = {
  users: [],
  page: -1,
  selectedUser: {},
  updatedUsers: [],
  errors: [],
};

const mutations = {
  getAllUsers(state: any, payload: any) {
    if (payload.value.length > 0) {
      payload.value.forEach((user: any) => {
        state.users.push(user);
      });
    } else {
      state.users = [];
    }
  },

  pageIncrease(state: any) {
    state.page++;
  },

  selectedUser(state: any, payload: any) {
    state.errors = [];
    state.selectedUser = { ...payload.value };
  },

  updatedUsers(state: any, payload: any) {
    let existedId = state.selectedUser.id,
      existItem = state.updatedUsers.filter(
        (item: any) => item.id == existedId
      );
    if (existItem.length == 0) {
      state.updatedUsers.push(state.selectedUser);
    } else {
      let pos = state.updatedUsers.findIndex((e: any) => e.id == existedId);
      state.updatedUsers[pos] = { ...state.selectedUser };
    }
  },

  resetUser(state: any, payload: any) {
    for (let key in state.selectedUser) {
      let value = state.selectedUser[key];
      if (
        key != 'id' &&
        key != 'location' &&
        key != 'picture' &&
        key != 'registerDate' &&
        key != 'updatedDate'
      ) {
        state.selectedUser[key] = '';
      }
    }
  },

  validate(state: any, payload: any) {
    for (let key in state.selectedUser) {
      let value = state.selectedUser[key];
      let uppercaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      let msg = uppercaseKey + ' required';
      if (
        key != 'id' &&
        key != 'location' &&
        key != 'picture' &&
        key != 'registerDate' &&
        key != 'updatedDate'
      ) {
        if (state.selectedUser[key] == '') {
          if (!state.errors.includes(msg)) {
            state.errors.push(msg);
          }
        } else {
          let findIndex = state.errors.indexOf(msg);
          if (findIndex > -1) {
            state.errors.splice(findIndex, 1);
          }
        }
      }
    }
  },
};

const actions = {
  pageIncrease({ commit }: any) {
    commit('pageIncrease');
  },

  fetchFirst({ commit, state, dispatch }: any) {
    if (localStorage.length > 0 && localStorage.getItem('vuex') !== '') return;
    dispatch('getAllUsers');
  },

  async getAllUsers({ commit, state, dispatch }: any) {
    dispatch('pageIncrease');
    return await https
      .get(
        `${
          import.meta.env.VITE_API_ROUTE +
          '/user?page=' +
          state.page +
          '&limit=12'
        }`
      )
      .then((res) => {
        let tmp = JSON.parse(res.data);
        commit('getAllUsers', { value: tmp.data });
      });
  },

  loadMoreUsers(context: any) {
    context.dispatch('getAllUsers');
  },

  async getUser({ commit, state, dispatch }: any, payload: any) {
    let existInStore = state.updatedUsers.filter(
      (e: any) => e.id == payload.id
    );
    if (existInStore.length > 0) {
      commit('selectedUser', { value: existInStore[0] });
      return;
    }

    return new Promise((resolve, reject) => {
      https
        .get(`${import.meta.env.VITE_API_ROUTE + '/user/' + payload.id}`)
        .then((res) => {
          let tmp = JSON.parse(res.data);
          commit('selectedUser', { value: tmp });
          resolve(true);
        });
    });
  },

  updatedUsers({ commit, state, dispatch }: any, payload: any) {
    commit('updatedUsers');
  },

  reset({ commit, state, dispatch }: any, payload: any) {
    commit('resetUser');
  },

  validate({ commit, state, dispatch }: any, payload: any) {
    commit('validate');
  },
};

const getters = {
  all(state: any) {
    return state.users;
  },
  user(state: any) {
    return state.selectedUser;
  },
  error: (state: any) => state.errors,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
