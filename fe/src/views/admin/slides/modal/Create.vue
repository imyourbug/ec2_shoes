<template>
  <div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Thêm mới</h5>
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
            <label class="form-label">Ảnh</label>
            <input @change="uploadImage" type="file" class="form-control" />
            <img v-if="slide.image" :src="slide.image" class="slide-img"/>
            <div :class="{ error: v$.image.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.image.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Sắp xếp</label>
            <input
              v-model="slide.sort_by"
              type="text"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Kích hoạt</label>
            <div class="form-check">
              <input
                v-model="slide.active"
                class="form-check-input"
                name="active1"
                value="1"
                id="flexRadioDefault1"
                type="radio"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Có
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="slide.active"
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
  slide: Object,
  rules: Object,
  add: Function,
  uploadImage: Function,
});

const v$ = useVuelidate(props.rules, props.slide);
</script>
<style scoped>
.slide-img {
  width: 200px;
  height: 100px;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
