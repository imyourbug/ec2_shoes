<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm mới tài khoản</h5>
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
            <label class="form-label">Email</label>
            <input type="text" class="form-control" v-model="account.email" />
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
            <label class="form-label">Mật khẩu</label>
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
          <button id="btn-add" class="btn btn-success" @click="add">Lưu</button>
          <button @click="v$.$reset()" class="btn btn-danger" type="button" data-dismiss="modal">
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
  account: Object,
  rules: Object,
  add: Function,
});

const v$ = useVuelidate(props.rules, props.account);

</script>
<style scoped>
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
