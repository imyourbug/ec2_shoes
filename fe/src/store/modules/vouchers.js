import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const voucherRepository = RepositoryFactory.get("voucher");

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
      voucherRepository.getAllVouchers().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.vouchers);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getDetailCategory({ commit }, voucher_id) {
    try {
      voucherRepository.getDetailCategory(voucher_id).then((response) => {
        if (response.data.status === 0) {
          commit("setDetail", response.data.voucher);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

// mutations
const mutations = {
  setAll(state, vouchers) {
    state.all = vouchers;
  },
  setDetail(state, voucher) {
    state.detail = voucher;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
