import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const detailRepository = RepositoryFactory.get("detail_product");
const clientRepository = RepositoryFactory.get("client");

// initial state
const state = {
  details: [],
  all: [],
  error: "",
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    try {
      detailRepository.getAll().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.data);
        }
        if (response.data.status === 1) {
          commit("setError", response.data.error.message);
        }
      });
    } catch (e) {
      commit("setError", e.message);
    }
  },
  getByProductId({ commit }, product_id) {
    if (parseInt(product_id) !== 0) {
      let details = [];
      let id = parseInt(product_id);
      state.all.forEach((item) => {
        if (item.product_id === id) details.push(item);
      });
      commit("setFilterDetail", details);
    } else {
      commit("setAll", state.all);
    }
  },
};

// mutations
const mutations = {
  setAll(state, detail_products) {
    state.all = state.details = detail_products;
  },
  setFilterDetail(state, detail_products) {
    state.details = detail_products;
  },
  setError(state, error) {
    state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
