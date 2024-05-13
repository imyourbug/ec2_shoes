<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chỉnh sửa danh mục</h5>
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
            <label class="form-label">Tên nhà cung cấp</label>
            <input type="text" class="form-control" v-model="supplier.name" />
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
            <label class="form-label">Email</label>
            <input type="text" class="form-control" v-model="supplier.email" />
            <div :class="{ error: v$.email.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.email.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" v-model="supplier.address" />
            <div :class="{ error: v$.address.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.address.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" v-model="supplier.phone" />
            <div :class="{ error: v$.phone.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.phone.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
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
  supplier: Object,
  rules: Object,
  edit: Function,
});

const v$ = useVuelidate(props.rules, props.supplier);

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
