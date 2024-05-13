import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const orderRepository = RepositoryFactory.get("order");

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
      orderRepository.getAllOrders().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.orders);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getOrderById({ commit }, order_id) {
    orderRepository.getOrderById(order_id).then((response) => {
      if (response.data.status === 0) {
        commit("setDetail", response.data);
      }
    });
  },
};

// mutations
const mutations = {
  setAll(state, orders) {
    state.all = orders;
  },
  setDetail(state, data) {
    state.detail = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
