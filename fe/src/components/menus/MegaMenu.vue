<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-info">
    <router-link class="navbar-brand" :to="{ name: 'home' }"
      >Trang chủ</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul
        class="navbar-nav mr-auto"
        v-if="tree_categories && tree_categories.length > 0"
      >
        <li
          class="nav-item dropdown"
          v-for="category in tree_categories"
          :key="category.id"
        >
          <router-link
            :to="{
              path: getUrlByCategory(category.id),
            }"
            class="nav-link category"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <strong> {{ category.name }} </strong>&ensp;
            <i
              v-if="category.children && category.children.length > 0"
              class="fa-solid fa-caret-down icon-catgory"
            ></i>
          </router-link>
          <div
            class="dropdown-menu"
            aria-labelledby="navbarDropdown"
            v-if="category.children && category.children.length > 0"
          >
            <div class="container">
              <div class="row">
                <div
                  class="col-md-3"
                  v-for="cate in category.children"
                  :key="cate.id"
                >
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <router-link
                        :to="{
                          path: getUrlByCategory(cate.id),
                        }"
                        class="nav-link active"
                        >{{ cate.name }}</router-link
                      >
                    </li>
                    <li class="nav-item" v-for="c in cate.children" :key="c.id">
                      <router-link
                        :to="{
                          path: getUrlByCategory(c.id),
                        }"
                        class="nav-link i"
                        >{{ c.name }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li
          class="nav-item dropdown"
        >
          <router-link
            :to="{name: 'order_search'}"
            class="nav-link category"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <strong>Tra cứu đơn hàng</strong>&ensp;
      </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  categories: Object,
  tree_categories: Object,
  getUrlByCategory: Function
});
</script>

<style scoped>
.navbar {
  padding: 0px 146px;
  /* margin-bottom: 20px; */
  background-color: #2e3094 !important;
}
.navbar .dropdown-menu div[class*="col"] {
  margin-bottom: 1rem;
}

.navbar .dropdown-menu {
  border: none;
  background-color: rgb(0, 115, 168) !important;
  margin-top: 7px;
  padding: 10px 120px;
}

.navbar {
  padding-top: 0px;
  padding-bottom: 0px;
}

.navbar .nav-item {
  padding: 1px 12px;
}

.navbar .dropdown {
  position: static;
}

.navbar .dropdown-menu {
  width: 100%;
  left: 0;
  right: 0;
  top: 39px;
}

.navbar .dropdown:hover .icon-catgory {
  transform: rotate(180deg);
  transition: all 0.25s ease;
}
.navbar .dropdown:hover .dropdown-menu,
.navbar .dropdown .dropdown-menu:hover {
  display: block !important;
}

.navbar .dropdown-menu {
  background-color: #fff;
}

a.i {
  margin-top: -20px;
  font-weight: 400;
  color: white;
}

a.category {
  margin-left: -24px;
  color: white;
  padding: 10px 0px;
}
.navbar-brand:hover,
a.category:hover {
  background-color: #ed1a29;
}

button.srch {
  padding: 0px;
}

@media only screen and (max-width: 1024px) and (min-width: 768px) {
  input.srch {
    padding: 0px;
    width: 100%;
  }
}
a.nav-link.active {
  font-weight: 700;
  background-color: #2e3094;
  color: white;
}

a.nav-link.active:hover {
  background-color: #ed1a29;
}
a.nav-link.i {
  color: white;
  margin-top: 1px;
}
a.nav-link.i:hover {
  color: rgb(134, 125, 125);
  cursor: pointer;
}
a.navbar-brand {
  padding: 7px 25px;
  margin-right: 12px;
  color: white;
  font-size: 20px;
}

span.navbar-toggler.icon {
  color: black;
}

@media (max-width: 620px){
 .navbar-brand {
    display: none !important;
  }
  .navbar {
    padding: 0px;
  }
}
</style>
