import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const shipmentRepository = RepositoryFactory.get("shipment");

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
      shipmentRepository.getAllShipments().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.shipments);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getDetailShipment({ commit }, shipment_id) {
    try {
      shipmentRepository.getDetailShipment(shipment_id).then((response) => {
        if (response.data.status === 0) {
          commit("setDetail", response.data.shipment);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
};

// mutations
const mutations = {
  setAll(state, shipments) {
    state.all = shipments;
  },
  setDetail(state, shipment) {
    state.detail = shipment;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
