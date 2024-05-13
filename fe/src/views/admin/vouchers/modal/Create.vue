<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm mới khuyến mãi</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
            @click="v$.$reset()"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nội dung khuyến mãi</label>
            <input type="text" class="form-control" v-model="voucher.name" />
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
            <label class="form-label">Giảm giá</label>
            <input
              v-model="voucher.discount"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="voucher.active"
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
                v-model="voucher.active"
                class="form-check-input"
                id="flexRadioDefault2"
                name="active1"
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
          <button
            @click="v$.$reset()"
            class="btn btn-danger"
            type="button"
            data-dismiss="modal"
          >
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
  voucher: Object,
  rules: Object,
  add: Function,
});

const v$ = useVuelidate(props.rules, props.voucher);
</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
