import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const accountRepository = RepositoryFactory.get("account");

// initial state
const state = {
  all: [],
  detail: [],
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      accountRepository.getAll().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.accounts);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getDetailAccount({ commit }, account_id) {
    try {
      accountRepository.getDetail(account_id).then((response) => {
        if (response.data.status === 0) {
          commit("setDetail", response.data.account);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setAll(state, account) {
    state.all = account;
  },
  setDetail(state, account) {
    state.detail = account;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
