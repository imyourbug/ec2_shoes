<template>
  <div
    class="modal fade"
    id="modalAdd"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm chi tiết sản phẩm</h5>
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
            <label class="form-label">Sản phẩm</label>
            <select
              class="form-control"
              v-model="detail_product.product_id"
              v-if="products && products.length > 0"
            >
              <option
                :value="product.id"
                v-for="product in products"
                :key="product.id"
              >
                {{ product.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Màu sắc</label>
            <input
              type="color"
              class="form-control"
              v-model="detail_product.color"
            />
            <div :class="{ error: v$.color.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.color.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Size</label>
            <select class="form-control" v-model="detail_product.size">
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
              <option value="43">43</option>
            </select>
            <div :class="{ error: v$.size.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.size.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Số lượng nhập</label>
            <input
              type="number"
              class="form-control"
              v-model="detail_product.quantity"
            />
            <div :class="{ error: v$.quantity.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.quantity.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img style="width: 100px;height: 100px;" :src="detail_product.thumb" />
            <div :class="{ error: v$.thumb.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.thumb.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
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
import { defineProps } from 'vue';

import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  detail_product: Object,
  products: Array,
  add: Function,
  uploadImage: Function,
  rules: Object,
});

const v$ = useVuelidate(props.rules, props.detail_product);
</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
