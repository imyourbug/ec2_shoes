import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';

const categoryRepository = RepositoryFactory.get("category");

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
      categoryRepository.getAllCategories().then((response) => {
        if (response.data.status === 0) {
          commit("setAll", response.data.categories);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  getDetailCategory({ commit }, category_id) {
    try {
      categoryRepository.getDetailCategory(category_id).then((response) => {
        if (response.data.status === 0) {
          commit("setDetail", response.data.category);
        }
      });
    } catch (e) {
      console.log(e);
    }
  },
  filterCategory({ commit }, payload) {
    let category_id = payload[0];
    let filter = payload[1];
    try {
      categoryRepository.getDetailCategory(category_id).then((response) => {
        if (response.data.status === 0) {
          var products = response.data.category.detail.products;
          if (filter.price) {
            let range = filter.price.split("-");
            products = products.filter(
              (item) =>
                (item.price_sale ?? item.price) >= parseInt(range[0]) &&
                (item.price_sale ?? item.price) <= parseInt(range[1])
            );
          }
          if (filter.sortAlphabet) {
            if (filter.sortAlphabet == "ASC") {
              products.sort((a, b) => a.name.localeCompare(b.name));
            } else {
              products.sort((a, b) => b.name.localeCompare(a.name));
            }
          }
          if (filter.sortSold) {
            if (filter.sortSold == "ASC") {
              products.sort((a, b) => a.sold - b.sold);
            } else {
              products.sort((a, b) => b.sold - a.sold);
            }
          }
          if (filter.sortPrice) {
            if (filter.sortPrice == "ASC") {
              products.sort(
                (a, b) => (a.price_sale ?? a.price) - (b.price_sale ?? b.price)
              );
            } else {
              products.sort(
                (a, b) => (b.price_sale ?? b.price) - (a.price_sale ?? a.price)
              );
            }
          }
          let category = response.data.category;
          category.detail.products = products;
          console.log("category ", category);

          commit("setDetail", category);
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
  setDetail(state, category) {
    state.detail = category;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
