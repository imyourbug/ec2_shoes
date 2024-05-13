<template>
  <div>
    <div class="row">
      <div class="block-head-2">
        <div class="head-text">
          <router-link :to="{ name: 'home' }" style="color: #ed1a29"
            >Trang chủ</router-link
          >>>
          <a v-if="category.detail" style="color: #ed1a29">
            {{ category.detail.name }}
          </a>
        </div>
      </div>
    </div>
    <div
      class="group-product"
      v-if="category.children && category.children.length > 0"
    >
      <div class="album bg-light">
        <div class="container">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
            <div
              class="col"
              v-for="(child, key) in category.children"
              :key="key"
            >
              <a @click="reloadGroupProduct(child.id)">
                <div class="block-product">
                  <a>
                    <img
                      src="http://localhost:8000/storage/uploads/img-not-available.jpg"
                  /></a>
                  <a>
                    <p>{{ child.name }}</p>
                  </a>
                  <br />&ensp;
                </div>
              </a>
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
    <div class="group-product">
      <div class="album bg-light">
        <div v-if="category.detail" class="container">
          <div class="block-text-1">
            <div class="block-text-left">
              <a class="btn-left"
                >&ensp;<i class="far fa-futbol"></i>&ensp;{{
                  category.detail.name
                }}&emsp;</a
              >
            </div>
            <div class="block-text-right">
              <a class="btn-right"
                >Xem thêm <i class="fas fa-chevron-right"></i
                ><i class="fas fa-chevron-right"></i
              ></a>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-2">
              <p class="mt-2">Sắp xếp</p>
              <div class="form-group">
                <label for="">Theo tên</label>
                <select
                  class="form-select"
                  v-model="filter.sortAlphabet"
                  @change="filterProduct(category_id, 'sort-name')"
                >
                  <option value="">--Nhập lựa chọn--</option>
                  <option value="ASC">A - Z</option>
                  <option value="DESC">Z - A</option>
                </select>
              </div>
              <div class="form-group mt-2">
                <label for="">Giá</label>
                <select
                  class="form-select"
                  v-model="filter.sortPrice"
                  @change="filterProduct(category_id, 'sort-price')"
                >
                  <option value="">--Nhập lựa chọn--</option>
                  <option value="ASC">Tăng dần</option>
                  <option value="DESC">Giảm dần</option>
                </select>
              </div>
              <div class="form-group mt-2">
                <label for="">Bán chạy</label>
                <select
                  class="form-select"
                  v-model="filter.sortSold"
                  @change="filterProduct(category_id, 'sort-sold')"
                >
                  <option value="">--Nhập lựa chọn--</option>
                  <option value="ASC">Tăng dần</option>
                  <option value="DESC">Giảm dần</option>
                </select>
              </div>
              <p class="mt-2">Lọc</p>
              <div class="form-group">
                <label for="">Theo giá</label>
                <select
                  @change="filterProduct(category_id, 'filter-price')"
                  class="form-select"
                  v-model="filter.price"
                >
                  <option value="">--Tất cả--</option>
                  <option value="0-1000000">0 - 1.000.000 VNĐ</option>
                  <option value="1000000-2000000">
                    1.000.000 - 2.000.000 VNĐ
                  </option>
                  <option value="2000000-3000000">
                    2.000.000 - 3.000.000 VNĐ
                  </option>
                  <option value="3000000-4000000">
                    3.000.000 - 4.000.000 VNĐ
                  </option>
                  <option value="4000000-5000000">
                    4.000.000 - 5.000.000 VNĐ
                  </option>
                  <option value="5000000-99999999999">
                    5.000.000 VNĐ trở lên
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-9 col-md-8">
              <div
                class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3"
                v-if="
                  category.detail.products &&
                  category.detail.products.length > 0
                "
              >
                <div
                  class="col"
                  v-for="(product, key) in category.detail.products"
                  :key="key"
                >
                  <router-link
                    :to="{
                      name: 'product_detail',
                      params: { id: product.id },
                    }"
                  >
                    <div class="block-product">
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
              <div v-else>
                <ProductEmpty />
              </div>
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
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { showPrice } from "@/helpers/helper.js";

import ProductEmpty from "../../components/products/ProductEmpty.vue";

const router = useRouter();
const store = useStore();

const filter = reactive({
  sortAlphabet: "",
  sortSold: "",
  sortPrice: "",
  price: "",
});

const category_id = computed(() => {
  return router.currentRoute.value.params.id_category;
});

const category = computed(() => {
  return store.state.categories.detail;
});

const reload = (category_id) => {
  store.dispatch("categories/getDetailCategory", category_id);
};

const filterProduct = (category_id, type) => {
  switch (type) {
    case "sort-price":
      filter.sortAlphabet = filter.sortSold = "";
      break;
    case "sort-sold":
      filter.sortAlphabet = filter.sortPrice = "";
      break;
    case "sort-name":
      filter.sortSold = filter.sortPrice = "";
      break;
    default:
      filter.sortAlphabet = filter.sortPrice = filter.sortSold = "";
      break;
  }
  store.dispatch("categories/filterCategory", [category_id, filter]);
};

reload(category_id.value);

const reloadGroupProduct = (cate_id) => {
  router.push({
    path: `/categories/${cate_id}`,
  });
};

watch(
  () => category_id.value,
  (newValue) => {
    reload(newValue);
  }
);
</script>

<style scoped>
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
.card-body,
.text-card {
  text-align: left;
}
.card-text {
  font-weight: bold;
}

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
