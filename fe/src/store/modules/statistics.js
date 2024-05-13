import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const statisticRepository = RepositoryFactory.get("statistic");

// initial state
const state = {
  revenue: [],
};

// getters
const getters = {};

// actions
const actions = {
  getRevenue({ commit }, range) {
    try {
      statisticRepository.getRevenueByMonth(range).then((response) => {
        if (response.data.status === 0) {
          commit("setRevenue", response.data.data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
};

// mutations
const mutations = {
  setRevenue(state, data) {
    state.revenue = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
