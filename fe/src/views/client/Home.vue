<template>
  <div>
    <div class="row slider">
      <div class="list-danhmuc col-lg-3 col-md-6 col-sm-12">
        <div class="danhmuc">
          <div class="text-top">
            <i class="fas fa-bars"></i>&ensp;DANH MỤC SẢN PHẨM
          </div>
          <br />
          <div class="option" v-if="categories && categories.length > 0">
            <div v-for="(category, key) in categories" :key="key">
              <router-link
                :to="{
                  path: getUrlByCategory(category.id),
                }"
                v-if="category.parent_id === 0"
                ><i class="fas fa-arrow-circle-right"></i>&ensp;{{
                  category.name
                }}</router-link
              >
              <hr v-if="category.parent_id === 0" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9 col-md-6 col-sm-12">
        <Slide :slides="slides" :autoplay="2000" />
      </div>
    </div>
    <br />
    <ListProduct
      title="SẢN PHẨM MỚI NHẤT"
      :products="newestProducts"
      itemsToShow="5"
      autoplay="10000"
    />
    <ListProduct
      title="SẢN PHẨM NỔI BẬT"
      :products="hottestProducts"
      itemsToShow="5"
      autoplay="10000"
    />
    <Slide :slides="slides" :autoplay="3000" />
    <main v-if="categories && categories.length > 0">
      <div
        class="group-product"
        v-for="(category, key) in categories"
        :key="key"
      >
        <div
          class="album bg-light"
          v-if="category.products && category.products.length > 0"
        >
          <div class="container">
            <div class="block-text-1">
              <div class="block-text-left">
                <router-link
                  class="btn-left"
                  :to="{
                    path: getUrlByCategory(category.id),
                  }"
                  >&ensp;<i class="far fa-futbol"></i>&ensp;{{
                    category.name
                  }}&emsp;</router-link
                >
              </div>
              <div class="block-text-right">
                <router-link
                  class="btn-right"
                  :to="{
                    path: getUrlByCategory(category.id),
                  }"
                  >Xem thêm <i class="fas fa-chevron-right"></i
                  ><i class="fas fa-chevron-right"></i
                ></router-link>
              </div>
            </div>
            <br />
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
              <div
                class="col"
                v-for="(product, key) in category.products"
                :key="key"
              >
                <router-link :to="`/products/detail/${product.id}`">
                  <div class="block-product" style="padding: 0px 10px">
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
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
      <div class="block-feature">
        <div class="row features">
          <div class="col-lg-4 col-md-4 col-sm-4 feature">
            <div class=""><i class="logo-feature fas fa-tshirt"></i></div>
            &ensp;
            <div class="in-feature">
              <div class="text-top">SẢN PHẨM ĐA DẠNG</div>
              <div class="text-bot">Cung cấp nhiều mẫu mã đẹp</div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 feature">
            <div class=""><i class="logo-feature fas fa-dolly-flatbed"></i></div>
            &ensp;
            <div class="in-feature">
              <div class="text-top">GIAO HÀNG SIÊU TỐC</div>
              <div class="text-bot">Giao hàng ngay sau khi đặt mua</div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 feature">
            <div class=""><i class="logo-feature fas fa-handshake"></i></div>
            &ensp;
            <div class="in-feature">
              <div class="text-top">CHÍNH SÁCH ƯU ÁI</div>
              <div class="text-bot">Chính sách bảo hành dài hạn</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useStore } from "vuex";

import ListProduct from "@/components/sliders/ListProduct.vue";
import Slide from "@/components/sliders/Slide.vue";
import { showPrice } from "@/helpers/helper.js";

const store = useStore();

const slides = computed(() => {
  return store.state.slides.all;
});

const newestProducts = computed(() => {
  return store.state.products.newest;
});

const hottestProducts = computed(() => {
  return store.state.products.hottest;
});

const categories = computed(() => {
  return store.state.categories.all;
});

const reload = () => {
  store.dispatch("categories/getAll");
  store.dispatch("slides/getAll");
  store.dispatch("products/getNewestProduct");
  store.dispatch("products/getHottestProduct");
};

reload();

const getUrlByCategory = (category_id) => {
  return `/categories/${category_id}`;
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.slider {
  margin: 10px 145px 10px 145px;
}

.list-danhmuc {
  padding: 0px;
}
.danhmuc .text-top {
  color: white;
  background-color: #ed1a29;
  padding: 10px;
  font-size: 17px;
  font-weight: bold;
}
.option div a {
  font-size: 16px;
  color: #2e3094;
  width: 100%;
  padding: 10px;
}
.option div a:hover {
  cursor: pointer;
  color: #ed1a29;
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
  cursor: pointer;
  color: white;
}
.btn-right {
  background-color: #393a44;
}
.btn-right:hover {
  cursor: pointer;
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

/* block-feature */
.block-feature {
  background-color: rgb(220, 220, 228);
  padding: 50px 160px;
}
.block-feature .features,
.features .feature {
  justify-content: center;
  display: flex;
}
.logo-feature {
  color: white;
  font-size: 30px;
  border-radius: 50%;
  padding: 12px 10px;
  background-color: red;
}
.in-feature .text-top {
  font-weight: bold;
  font-size: 18px;
}
@media (max-width: 620px) {
  .slider,
  .album {
    margin: 0px;
  }
  .block-feature {
    padding: 0px;
  }
  .block-text-right {
    display: none;
  }
}

@media (max-width: 440px) {
  .in-feature {
    display: none;
  }
}
</style>
