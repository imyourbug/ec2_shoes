<template>
  <div class="sliders">
    <div class="row">
      <div class="col">
        <div
          id="carouselExampleCaptions"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-indicators" v-if="slides && slides.length > 0">
            <button
              v-for="(slide, index) in slides"
              :key="index"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              :class="index === 0 ? 'active' : ''"
              :aria-current="index === 0 ? 'true' : 'false'"
              :data-bs-slide-to="index"
              :aria-label="`Slide ${index++}`"
            ></button>
          </div>
          <div class="carousel-inner" v-if="slides && slides.length > 0">
            <div
              class="carousel-item active"
              v-for="slide in slides"
              :key="slide.id"
            >
              <img :src="slide.image" class="d-block w-100" alt="..." />
              <div class="carousel-caption d-none d-md-block">
                <h5>Tiêu đề</h5>
                <p>Mô tả</p>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  inject,
  ref,
} from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory';
import { useToasted } from '@hoppscotch/vue-toasted';

const toast = useToasted();
const slideRepository = RepositoryFactory.get("slide");

const slides = ref([]);
const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

const reload = () => {
  slideRepository.getAllSlides().then((response) => {
    if (response.data.status === 0) {
      slides.value = response.data.slides;
    }
    if (response.data.status === 1) {
      toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status !== 0 && response.data.status !== 1) {
      console.log(response.data);
    }
  });
};

reload();
</script>

<style scoped>
.sliders {
  /* height: 300px; */
  width: 100%;
}
.carousel-item img {
  width: 100%;
  height: 300px;
}
</style>
