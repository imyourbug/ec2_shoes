import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const supplierRepository = RepositoryFactory.get("supplier");

// initial state
const state = {
  all: [],
  error: null,
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      supplierRepository.getAll().then((response) => {
        commit("setAll", response.data.suppliers);
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setAll(state, suppliers) {
    state.all = suppliers;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
