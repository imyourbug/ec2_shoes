// initial state
const state = {
  all: [],
};

// getters
const getters = {};

// actions
const actions = {
  getAll({ commit }) {
    commit('setAll', JSON.parse(localStorage.getItem("carts")));
  },
  setAll({ commit }, carts) {
    commit('setAll', carts);
  },
};

// mutations
const mutations = {
  setAll(state, carts) {
    state.all = carts;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
