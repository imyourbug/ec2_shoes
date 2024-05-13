<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chỉnh sửa khuyến mãi</h5>
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
            /><div :class="{ error: v$.discount.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.discount.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="voucher.active"
                class="form-check-input"
                name="active"
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
                name="active"
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
          <button id="btn-edit" class="btn btn-success" @click="edit">Lưu</button>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  defineProps,
  onMounted,
} from 'vue';

import { useVuelidate } from '@vuelidate/core';

const props = defineProps({
  voucher: Object,
  rules: Object,
  edit: Function,
});

const v$ = useVuelidate(props.rules, props.voucher);

onMounted(() => {
  v$.value.$reset();
});
</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
