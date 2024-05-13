<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chỉnh sửa tài khoản</h5>
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
            <label class="form-label">Email</label>
            <input type="text" class="form-control" v-model="account.email" disabled/>
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
            <label class="form-label">Mật khẩu mới</label>
            <input type="password" class="form-control" v-model="account.password" />
            <div :class="{ error: v$.password.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.password.$errors" 
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Vai trò</label>
            <select
              class="form-control"
              v-model="account.role"
            >
            <option value="0">Người dùng</option>
              <option value="1">Quản trị viên</option>
            </select>
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
  account: Object,
  rules: Object,
  edit: Function,
});

const v$ = useVuelidate(props.rules, props.account);

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
