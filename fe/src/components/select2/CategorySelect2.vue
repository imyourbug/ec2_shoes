<template>
  <Select2
    :options="categories"
    :settings="{ settingOption: value, settingOption: value }"
    @select="selectCategory($event)"
  />
  <h4>{{ value }}</h4>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  categories: Array,
});
</script>

<style scoped></style>
