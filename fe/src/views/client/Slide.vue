<template>
  <carousel :items-to-show="1" :autoplay="autoplay" :wrap-around="true">
    <slide v-for="(slide, key) in slides" :key="key">
      <img :src="slide.image" class="slide-img" />
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";

import { computed, defineProps, inject, ref } from "vue";

import { useRouter } from "vue-router";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import { useStore } from "vuex";

import { RepositoryFactory } from "@/api/repositories/RepositoryFactory";

const router = useRouter();
const store = useStore();

const emitter = inject("emitter");
const slideRepository = RepositoryFactory.get("slide");

const props = defineProps({
  slides: Array,
  autoplay: Number,
});

const reload = () => {
  store.dispatch("slides/getAll");
  console.log(slides.value);
};
</script>

<style scoped>
.slide-img {
  width: 100%;
  height: 100%;
}
</style>
