<template>
  <div class="group-product">
    <div class="album bg-light">
      <div class="container">
        <div class="block-text-1" style="justify-content: center">
          <div class="txt-title btn-left">{{ title }}</div>
        </div>
        <br />
        <div class="row">
          <div class="col-12">
            <carousel
              :items-to-show="itemsToShow"
              :autoplay="autoplay"
              :wrap-around="true"
            >
              <slide v-for="(product, key) in products" :key="key">
                <router-link :to="`/products/detail/${product.id}`">
                  <div
                    class="block-product"
                    style="min-height: 100%; padding: 0px 10px"
                  >
                    <a>
                      <img
                        style="max-width: 200px; max-height: 200px"
                        :src="product.thumb"
                    /></a>
                    <a>
                      <p>{{ product.name }}</p>
                    </a>
                    <p
                      v-html="showPrice(product.price, product.price_sale)"
                    ></p>
                    <div
                      class=""
                      style="
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                      "
                    >
                      <a class="detail"> Chi tiết</a>
                      <p style="font-size: 12px">Đã bán {{ product.sold }}</p>
                    </div>
                    <br />
                  </div>
                </router-link>
              </slide>
              <br />
              <!-- <template #addons>
                <navigation />
              </template> -->
            </carousel>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";

import { defineProps } from "vue";

import { Carousel, Navigation, Slide } from "vue3-carousel";

import { showPrice } from "@/helpers/helper.js";

const props = defineProps({
  products: Array,
  title: String,
  itemsToShow: Number,
  autoplay: Number,
});
</script>

<style scoped>
a {
  text-decoration: none;
}
.album {
  margin: 0px 145px;
}

.block-text-1 {
  border-bottom: 1px solid #ed1a29;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px 8px 0px;
}
.block-text-1 a {
  color: white;
  padding: 8px;
}
.txt-title {
  padding: 10px 60px;
  background-color: #ed1a29;
  font-size: 25px;
  color: white;
  font-weight: bold;
}
/*  */
.block-product {
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}
.block-product img {
  width: 100%;
}
.block-product p {
  margin-top: 10px;
}

.block-product:hover {
  transition: 0.5s;
  box-shadow: 0px 8px 16px 0px rgb(99, 95, 95);
}
a,
.block-product p {
  color: black;
}
a:hover,
.block-product p:hover {
  color: #ed1a29;
}
a.detail {
  color: #ed1a29;
  font-weight: bold;
  background-color: white;
  padding: 5px 10px 5px 10px;
  border-radius: 60px;
  outline: 1px solid #ed1a29;
  margin-bottom: 10px;
}
a.detail:hover {
  color: #ed1a29;
  outline: 2px solid #ed1a29;
}

@media (max-width: 620px) {
  .album {
    margin: 0px;
  }
  .txt-title {
    font-size: 18px;
  }
}

@media (max-width: 880px) {
   .carousel__slide {
  width: 100% !important;
}
}
</style>
