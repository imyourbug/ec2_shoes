<template>
  <div class="row">
    <div class="block-head-2">
      <div class="head-text">
        <router-link :to="{ name: 'home' }" style="color: #ed1a29"
          >Trang chủ</router-link
        >>>
        <a style="color: #ed1a29" href="#"> Tìm kiếm </a>
        >>
        <a style="color: #ed1a29" href="#">
          {{ key_word }}
        </a>
      </div>
    </div>
  </div>
  <div class="album bg-light">
    <div class="container">
      <div class="block-text-1">
        <div class="block-text-left">
          <a class="btn-left"
            >&ensp;<i class="far fa-futbol"></i>&ensp;Sản phẩm tìm kiếm&emsp;</a
          >
        </div>
        <div class="block-text-right">
          <a class="btn-right"
            >Xem thêm <i class="fas fa-chevron-right"></i
            ><i class="fas fa-chevron-right"></i
          ></a>
        </div>
      </div>
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3"
        v-if="products && products.length > 0"
      >
        <div class="col" v-for="(info, key) in products" v-bind:key="key">
          <router-link :to="`/products/detail/${info.id}`">
            <div class="block-product">
              <a> <img :src="info.thumb" /></a>
              <a>
                <p>{{ info.name }}</p>
              </a>
              <p v-html="showPrice(info.price, info.price_sale)"></p>
              <div
                class=""
                style="
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                "
              >
                <a class="detail"> Chi tiết</a>
                <p style="font-size: 12px">Đã bán {{ info.sold }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row" v-else><SearchEmpty /></div>
      <div
        class="block-text-1"
        v-if="other_products && other_products.length > 0"
      >
        <div class="block-text-left">
          <a class="btn-left"
            >&ensp;<i class="far fa-futbol"></i>&ensp;Sản phẩm khác&emsp;</a
          >
        </div>
        <div class="block-text-right">
          <a class="btn-right"
            >Xem thêm <i class="fas fa-chevron-right"></i
            ><i class="fas fa-chevron-right"></i
          ></a>
        </div>
      </div>
      <div
        class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3"
        v-if="other_products && other_products.length > 0"
      >
        <div class="col" v-for="(info, key) in other_products" v-bind:key="key">
          <router-link :to="`/products/detail/${info.id}`">
            <div class="block-product">
              <a> <img :src="info.thumb" /></a>
              <a>
                <p>{{ info.name }}</p>
              </a>
              <p v-html="showPrice(info.price, info.price_sale)"></p>
              <div
                class=""
                style="
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                "
              >
                <a class="detail"> Chi tiết</a>
                <p style="font-size: 12px">Đã bán {{ info.sold }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  inject,
  ref,
} from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SearchEmpty from '@/components/searchs/SearchEmpty.vue';
import { showPrice } from '@/helpers/helper.js';

const emitter = inject("emitter");
const router = useRouter();
const store = useStore();

const key_word = computed(() => {
  return router.currentRoute.value.params.key_word;
});

const products = computed(() => {
  return store.state.products.search.like;
});

const other_products = computed(() => {
  return store.state.products.search.not_like;
});

emitter.on("searchProduct", (key) => {
  store.dispatch("products/searchProductByKeyWord", key);
});

const reload = () => {
  store.dispatch("products/searchProductByKeyWord", key_word.value);
};

reload();
</script>

<style scoped>
a {
  text-decoration: none;
}
.block-head-2 {
  align-items: center;
  padding: 10px 0px 0px 10px;
}

.block-head-2 a {
  color: black;
}

.block-head-2 a:hover {
  text-decoration: underline;
}
.head-text {
  padding: 15px 160px;
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
.btn-left {
  background-color: #ed1a29;
  font-size: 17px;
  font-weight: bold;
}
.btn-left:hover {
  color: white;
}
.btn-right {
  background-color: #393a44;
}
.btn-right:hover {
  background-color: #ed1a29;
  color: white;
}
/*  */
.block-product {
  align-items: center;
  text-align: center;
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
p,
.btn-out {
  text-align: center;
}
.id-pro {
  position: absolute;
  top: -9999px;
  left: -9999px;
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
</style>
