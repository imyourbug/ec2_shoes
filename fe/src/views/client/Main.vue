<template>
  <Header />
  <MegaMenu :categories="categories" :tree_categories="tree_categories" :getUrlByCategory="getUrlByCategory"/>
  <router-view />
  <Footer />
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue';

import { useStore } from 'vuex';

import MegaMenu from '@/components/menus/MegaMenu.vue';
import Footer from '@/views/client/Footer.vue';
import Header from '@/views/client/Header.vue';

const store = useStore();

const tree_categories = ref([]);

const categories = computed(() => {
  tree_categories.value = parseTree(store.state.categories.all);
  return store.state.categories.all;
});

const reload = () => {
  store.dispatch("categories/getAll");
};

reload();

const getUrlByCategory = (category_id) => {
  return `/categories/${category_id}`;
};

// parse flat structure to tree structure
const traverse = (arr, parentId) =>
  arr
    .filter((category) => category.parent_id === parentId)
    .reduce(
      (result, current) => [
        ...result,
        {
          ...current,
          children: traverse(arr, current.id),
        },
      ],
      []
    );

const parseTree = (arr) =>
  arr
    .sort(({ id }) => id)
    .filter(({ parent_id }) => !parent_id)
    .map((category) => ({
      ...category,
      children: traverse(arr, category.id),
    }));
</script>

<style scoped></style>
