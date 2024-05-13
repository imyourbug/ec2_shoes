<template>
  <carousel :items-to-show="1"  :autoplay="1500" :wrap-around="true">
    <slide v-for="(slide, key) in slides" :key="key">
      <img :src="slide.image" class="slide-img"/>
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css';

import { defineProps } from 'vue';

import {
  Carousel,
  Navigation,
  Pagination,
  Slide,
} from 'vue3-carousel';

const props = defineProps({
  slides: Array
})

</script>

<style scoped>
.slide-img{
  width: 100%;
  height: 100%;
}</style>
