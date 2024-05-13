<template>
  <div class="row">
    <div class="col-md-4 border-right block-right">
      <div class="d-flex flex-column align-items-center text-center p-3 py-5">
        <img class="rounded-circle mt-5 avatar" :src="user.avatar" width="90" />
        <input
          class="upload form-control"
          type="file"
          v-if="isEdit"
          @change="changeImage"
        />
        <span class="font-weight-bold">{{ user.name }}</span
        ><span class="text-black-50">{{ user.email }}</span>
      </div>
    </div>
    <div class="col-md-7 border-right">
      <div class="p-3 py-5">
        <div class="row mt-2">
          <div class="col-md-12">
            <label class="labels">Họ tên</label
            ><input
              type="text"
              class="form-control"
              placeholder="Họ tên"
              v-model="user.name"
              :readonly="!isEdit"
            />
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
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <label class="labels">Tỉnh/thành phố</label>
            <input
              type="text"
              class="form-control"
              v-model="user.province"
              placeholder="Tỉnh/thành phố"
              :readonly="!isEdit"
              v-if="!isEdit"
            />
            <div v-else>
              <Select2
                :options="source.provinces"
                :settings="{ settingOption: value, settingOption: value }"
                @select="selectProvince($event)"
              />
              <h4>{{ value }}</h4>
            </div>
            <div :class="{ error: v$.province.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.province.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <label class="labels">Quận/huyện</label>
            <input
              type="text"
              class="form-control"
              placeholder="Quận/huyện"
              v-model="user.district"
              :readonly="!isEdit"
              v-if="!isEdit"
            />
            <div v-else>
              <Select2
                :options="source.districts"
                :settings="{ settingOption: value, settingOption: value }"
                @select="selectDistrict($event)"
              />
              <h4>{{ value }}</h4>
            </div>
            <div :class="{ error: v$.district.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.district.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-6">
            <label class="labels">Xã</label>
            <input
              type="text"
              class="form-control"
              placeholder="Xã"
              v-model="user.ward"
              :readonly="!isEdit"
              v-if="!isEdit"
            />
            <div v-else>
              <Select2
                :options="source.wards"
                :settings="{ settingOption: value, settingOption: value }"
                @select="selectWard($event)"
              />
              <h4>{{ value }}</h4>
            </div>
            <div :class="{ error: v$.ward.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.ward.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <label class="labels">Đường</label
            ><input
              type="text"
              class="form-control"
              placeholder="Đường"
              v-model="user.street"
              :readonly="!isEdit"
            />
            <div :class="{ error: v$.street.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.street.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <label class="labels">Số điện thoại</label
            ><input
              type="text"
              class="form-control"
              placeholder="Số điện thoại"
              v-model="user.phone"
              :readonly="!isEdit"
            />
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
          <div class="col-md-12">
            <label class="labels">Mã bưu điện</label
            ><input
              type="text"
              class="form-control"
              placeholder="Mã bưu điện"
              v-model="user.zip_code"
              :readonly="!isEdit"
            />
            <div :class="{ error: v$.zip_code.$errors.length }">
              <div
                class="input-errors"
                v-for="error of v$.zip_code.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <button
            v-if="!isEdit"
            class="btn btn-primary action-button"
            @click="edit"
          >
            Chỉnh sửa
          </button>
          <button
            v-if="isEdit"
            class="btn btn-primary action-button"
            @click="save"
          >
            Lưu
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
  save: Function,
  selectProvince: Function,
  selectDistrict: Function,
  selectWard: Function,
  changeImage: Function,
  edit: Function,
  rules: Object,
  source: Object,
  user: Object,
  isEdit: Boolean,
});

const v$ = useVuelidate(props.rules, props.user);
</script>

<style scoped>
input.upload {
  margin-top: 10px;
  font-size: 10px;
  width: 200px;
}
.form-control:focus {
  box-shadow: none;
}

.action-button {
  background-color: #2e3094;
  border: none;
  width: 100px;
}

.action-button:hover {
  background-color: #ed1a29 !important;
}

.labels {
  font-size: 12px;
}

.avatar {
  width: 70px;
  height: 70px;
}

.avatar:hover {
  scale: 1.5;
  transition: 0.5s all ease;
  cursor: pointer;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
