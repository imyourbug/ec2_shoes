import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const commentRepository = RepositoryFactory.get("comments");

// initial state
const state = {
  all: [],
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      commentRepository.getAllComments().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.categories);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setAll(state, categories) {
    state.all = categories;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
