<template>
  <div class="user-header">
    <router-link v-if="user?.role == 1" :to="{ name: 'admin-home' }"
      ><i class="fa-solid fa-user"></i> Quản lý</router-link
    >
    <br v-if="user?.role == 1" />
    <router-link :to="{ name: 'info_user' }"
      ><i class="fa-solid fa-user"></i> Tài khoản</router-link
    >
    <br />
    <a
      data-toggle="modal"
      data-dismiss="modal"
      data-target="#modalChangePassword"
      ><i class="fa-solid fa-key"></i> Đổi mật khẩu</a
    >
    <br />
    <a @click="handleSignOut"
      ><i class="fa-solid fa-right-from-bracket btn-logout"></i> Đăng xuất</a
    ><br />
  </div>
</template>

<script setup>
import {
  defineProps,
  inject,
  watch,
} from 'vue';

import { useRouter } from 'vue-router';

import { setCookie } from '@/helpers/helper.js';

const props = defineProps({
  isLogged: Boolean,
  user: Object,
});

const router = useRouter();
const emitter = inject("emitter");

const handleSignOut = () => {
  unSaveUser();
  emitter.emit("reloadHeader");
};

const unSaveUser = () => {
  localStorage.clear();
  setCookie("access_token", "", 30);
  router.push({
    name: "home",
  });
};

watch(
  () => props.user,
  (newValue, oldValue) => {
  }
);
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:hover {
  color: #ed1a29;
  transition: all 0.5s ease;
}
.btn-logout:hover {
  cursor: pointer;
}
.user-header {
  display: none;
  position: absolute;
  z-index: 9999;
  width: max-content;
  background-color: white;
  text-align: left; 
  top: 30px;
  border: 1px solid #2e3094;
  border-radius: 5px;
  padding: 10px 15px;
}
</style>
