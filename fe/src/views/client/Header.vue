<template>
  <div class="row block-head">
    <div class="col-lg-6 col-sm-12 col-md-12 block-head-left">
      <router-link :to="{ name: 'home' }">Trang chủ</router-link>&emsp;
      <a href="#">Giới thiệu</a>&emsp;
      <a href="#">Dịch vụ in ấn</a>
    </div>
    <div class="col-lg-6 col-sm-12 col-md-12 block-head-right">
      <a href="#"><i class="fas fa-envelope"></i> Mail</a>&emsp;
      <span class="time"><i class="fas fa-clock"></i> 06:30 - 21:00</span>&emsp;
      <span><i class="fas fa-phone-alt"></i> 0368822642</span>
    </div>
  </div>
  <div class="row menu-header">
    <div class="col-lg-4 col-sm-6 col-md-6">
      <router-link class="text-menu-header" :to="{ name: 'home' }"
        ><img class="logo" src="@/assets/logo.png" /></router-link
      >&emsp;
    </div>
    <div class="col-lg-4 d-flex block-search">
      <input
        type="text"
        class="form-control me-2"
        placeholder="Tìm kiếm"
        v-model.trim="key_word"
        @keyup.enter="searchProduct"
      />
      <button @click.prevent="searchProduct" class="btn btn-success">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
    <div class="col-lg-4 col-sm-6 col-md-6 block-user">
      <div class="block-left-header">
        <router-link class="cart" to="/carts"
          ><i class="fa-solid fa-cart-shopping"></i
          ><sup class="cart-quantity">{{ carts.length }}</sup>
          <CartHeader
            class="cart-header"
            :carts="carts"
            :user="user" /></router-link
        >&emsp;
        <div
          class="btn-login"
          data-target="#modalLogin"
          data-toggle="modal"
          v-if="!isLogged"
        >
          <img
            class="nav-avatar"
            src="http://localhost:8000/storage/uploads/default.jpg"
          />
        </div>
        <div class="btn-logout btn-user" v-else>
          <img class="nav-avatar" :src="user.avatar" />
          &ensp;
          <UserHeader :user="user" />
        </div>
      </div>
    </div>
  </div>
  <ModalLogin class="modal fade" id="modalLogin" :add="add" />
  <ModalRegister class="modal fade" id="modalRegister" />
  <ModalForgetPass class="modal fade" id="modalForgetPass" />
  <ModalChangePassword
    :user="user"
    class="modal fade"
    id="modalChangePassword"
  />
</template>

<script setup>
import {
  inject,
  ref,
} from 'vue';

import { useRouter } from 'vue-router';

import CartHeader from '@/components/CartHeader.vue';
import UserHeader from '@/components/UserHeader.vue';
import ModalChangePassword from '@/components/users/ChangePassword.vue';
import ModalForgetPass from '@/components/users/ForgetPassword.vue';
import ModalLogin from '@/components/users/Login.vue';
import ModalRegister from '@/components/users/Register.vue';

const router = useRouter();
const emitter = inject("emitter");

const user = ref([]);
const isLogged = ref(false);
const key_word = ref("");
const carts = ref([]);

emitter.on("reloadHeader", () => {
  reload();
});

const searchProduct = () => {
  if (key_word.value.trim()) {
    emitter.emit("searchProduct", key_word.value.trim());

    router.push({
      path: `/products/search/q=${key_word.value.trim()}`,
    });
  }
};
const reload = () => {
  isLogged.value = localStorage.getItem("user") ? true : false;
  carts.value = JSON.parse(localStorage.getItem("carts")) ?? [];
  if (isLogged.value) {
    user.value = JSON.parse(localStorage.getItem("user"));
  }
  console.log(user.value);
};

reload();
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: black;
}
a:hover {
  color: black;
}
.block-left-header {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* cart header */
.cart {
  position: relative;
}
.cart:hover .cart-header {
  display: block;
}
.cart-header {
  display: none;
  width: 400px;
  right: 0px;
  height: max-content;
  position: absolute;
  z-index: 9999;
}
sup.cart-quantity {
  color: #ed1a29;
  border-radius: 50%;
  padding: 1px 4px;
  font-size: 14px;
}
.block-head {
  align-items: center;
  background-color: rgb(246, 249, 252);
  margin: 0px 160px;
}
.block-head a,
.block-head span {
  color: gray;
}
.block-head a:hover {
  color: gray;
}
.block-head-left {
  padding: 10px 0px 10px 0px;
}
.block-head-right {
  text-align: right;
}
.block-head-right span.time {
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 0px 15px 0px 15px;
}
.menu-header {
  padding: 15px 0px;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid rgb(233, 227, 227);
}
.logo {
  width: 200px;
  height: 40;
}
.block-search {
  padding-top: 10px;
  align-items: center;
}
.block-user {
  padding-top: 10px;
}
.btn-login,
.btn-logout {
  color: black;
  font-weight: bold;
}
.nav-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.nav-icon {
  font-size: 22px;
}
.btn-logout:hover,
.btn-login:hover {
  cursor: pointer;
  color: #ed1a29;
}
/* user-header */
.btn-user:hover .user-header {
  display: block;
}
.btn-user {
  position: relative;
}

@media (max-width: 620px){
  .block-head, .block-search {
    display: none !important;
  }
  .logo {
    max-width: 100%;
  }.menu-header {
    /* margin: 0px; */
  }

}
</style>
