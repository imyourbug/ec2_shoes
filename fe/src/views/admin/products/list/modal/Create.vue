<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm mới sản phẩm</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Tên sản phẩm</label>
            <input type="text" class="form-control" v-model="product.name" />
            <div :class="{ error: v$.name.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.name.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Giá gốc</label>
            <input type="number" class="form-control" v-model="product.price" />
            <div :class="{ error: v$.price.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.price.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Giá khuyến mãi</label>
            <input
              type="number"
              class="form-control"
              v-model="product.price_sale"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img style="width: 100px; height: 100px" :src="product.thumb" />
          </div>
          <div class="mb-3">
            <label class="form-label">Danh mục</label>
            <select
              class="form-control"
              v-model="product.category_id"
              v-if="categories && categories.length > 0"
            >
              <option
                :value="cate.id"
                v-for="cate in categories"
                :key="cate.id"
              >
                {{ cate.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Nhà cung cấp</label>
            <select
              class="form-control"
              v-model="product.supplier_id"
              v-if="suppliers && suppliers.length > 0"
            >
              <option
                :value="supplier.id"
                v-for="supplier in suppliers"
                :key="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                id="flexRadioDefault1"
                value="1"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="product.active"
                class="form-check-input"
                name="active1"
                id="flexRadioDefault2"
                value="0"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Không
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button id="btn-add" class="btn btn-success" @click="add">Lưu</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, onMounted, reactive } from "vue";

import { useVuelidate } from "@vuelidate/core";

const props = defineProps({
  product: Object,
  categories: Array,
  suppliers: Array,
  add: Function,
  uploadImage: Function,
  rules: Object,
});

const v$ = useVuelidate(props.rules, props.product);
</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
