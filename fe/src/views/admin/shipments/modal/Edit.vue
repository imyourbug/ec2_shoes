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
            <label class="form-label">Hãng vận chuyển</label>
            <input type="text" class="form-control" v-model="shipment.name" />
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
            <label class="form-label">Phí vận chuyển</label>
            <input v-model="shipment.fee" type="number" class="form-control" />
            <div :class="{ error: v$.fee.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.fee.$errors"
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
  shipment: Object,
  edit: Function,
  rules: Object,
});

const v$ = useVuelidate(props.rules, props.shipment);

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
