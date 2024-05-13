<template>
  <div class="container card py-2">
    <!-- <div class="row user py-3 px-3">Sản phẩm mới thêm</div> -->
    <div class="cart" v-if="carts && carts.length > 0">
      Sản phẩm mới thêm
      <div
        class="row product py-1"
        v-for="(product, key) in carts.slice(0, 4).reverse()"
        v-bind:key="key"
      >
        <div class="col-3">
          <img class="thumb" :src="product.thumb" />
        </div>
        <div class="col-5">
          {{ product.name }}
        </div>
        <div class="col-4 price">
          {{ formatCash(product.unit_price) }}<sup>đ</sup>
        </div>
      </div>
      <div class="row py-3">
        <div class="col-6">{{ carts.length }} sản phẩm trong giỏ</div>
        <div class="col-6 right">
          <router-link class="btn-cart" to="/carts">Xem giỏ hàng</router-link>
        </div>
      </div>
    </div>
    <div class="row py-3" v-else>
      <div class="col-6">Giỏ hàng trống</div>
      <div class="col-6 right">
        <router-link class="btn-cart" to="/carts">Xem giỏ hàng</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import { formatCash } from '@/helpers/helper';

const props = defineProps({
  carts: Object,
  user: Object,
});
</script>

<style scoped>
a {
  text-decoration: none;
}
.card {
  background-color: rgb(248, 233, 233);
  text-align: left;
  border: 2px solid #2e3094;
  -moz-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.4);
}
.btn-cart {
  color: white;
  background-color: #2f3094;
  padding: 10px 15px;
  border-radius: 5px;
}
.btn-cart:hover {
  transition: 0.5s ease;
  background-color: #ed1a29;
}
.user,
.product {
  align-items: center;
}
.thumb {
  width: 40px;
  height: 40px;
}
.price {
  color: #ed1a29;
}
.right {
  text-align: center;
}
</style>
