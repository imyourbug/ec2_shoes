import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const slideRepository = RepositoryFactory.get("slide");

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
      slideRepository.getAllSlides().then((response) => {
        commit("setAll", response.data.slides);
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setAll(state, slides) {
    state.all = slides;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
