<template>
  <div class="container rounded bg-white mt-2 mb-5">
    <Tab lazy-load>
      <TabItem title="Thông tin cá nhân" active style="overflow: hidden !important;">
        <InformationUser
          :save="save"
          :selectProvince="selectProvince"
          :selectDistrict="selectDistrict"
          :selectWard="selectWard"
          :changeImage="changeImage"
          :edit="edit"
          :rules="rules"
          :source="source"
          :user="user"
          :isEdit="isEdit"
        />
      </TabItem>
      <TabItem title="Lịch sử đơn hàng">
        <ListOrder />
      </TabItem>
    </Tab>
  </div>
</template>

<script setup>
import {
  inject,
  reactive,
  ref,
} from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory';
import InformationUser from '@/components/users/Information.vue';
import ListOrder from '@/components/users/orders/List.vue';
import { saveUser } from '@/helpers/helper.js';
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  required,
} from '@vuelidate/validators';

const uploadRepository = RepositoryFactory.get("upload");
const clientRepository = RepositoryFactory.get("client");
const provinceRepository = RepositoryFactory.get("province");
const emitter = inject("emitter");

const user = ref({});
const isEdit = ref(false);
const source = reactive({
  provinces: [],
  districts: [],
  wards: [],
});

// validate
const valid_phone = helpers.regex(/^[0]\d{9}$/);

const rules = {
  name: {
    required: helpers.withMessage("Không được để trống", required),
  },
  phone: {
    required: helpers.withMessage("Không được để trống", required),
    valid_phone: helpers.withMessage("Số điện thoại không hợp lệ", valid_phone),
  },
  province: {
    required: helpers.withMessage("Không được để trống", required),
  },
  district: {
    required: helpers.withMessage("Không được để trống", required),
  },
  ward: {
    required: helpers.withMessage("Không được để trống", required),
  },
  street: {
    required: helpers.withMessage("Không được để trống", required),
  },
  zip_code: {
    required: helpers.withMessage("Không được để trống", required),
  },
};

const v$ = useVuelidate(rules, user);

// select
const selectProvince = (province) => {
  user.value.province = province.text;
  // load districts
  provinceRepository
    .getDistrictsByCodeProvince(province.id)
    .then((response) => {
      let data = [];
      response.data.districts.forEach((item) => {
        data.push({
          // text is require to show value in screen
          // id is require to select an option
          id: item.code,
          text: item.name,
        });
      });
      source.districts = data;
    });
};

const selectDistrict = (district) => {
  user.value.district = district.text;
  // load districts
  provinceRepository.getWardsByCodeDistrict(district.id).then((response) => {
    let data = [];
    response.data.wards.forEach((item) => {
      data.push({
        // text is require to show value in screen
        // id is require to select an option
        id: item.code,
        text: item.name,
      });
    });
    source.wards = data;
  });
};

const selectWard = (ward) => {
  user.value.ward = ward.text;
};

// upload avatar
const changeImage = async (event) => {
  let formData = new FormData();
  console.log(event.target.files);
  formData.append("image_file", event.target.files[0]);
  let respone_upload = await uploadRepository.uploadImage(formData);
  if (respone_upload.data.status === 0) {
    user.value.avatar = respone_upload.data.url;
  }
  if (respone_upload.data.status === 1) {
    console.log(respone_upload.data.error.message);
  }
  if (respone_upload.data.status !== 1 && respone_upload.data.status !== 0) {
    console.log(respone_upload);
  }
};

const updateInfo = (user) => {
  clientRepository.updateInfo(user).then((response) => {
    if (response.data.status === 0) {
      console.log(response.data.user);
      saveUser(response.data.user);
      emitter.emit("reloadHeader");
      isEdit.value = false;
      reload();
    }
    if (response.data.status === 1) {
      console.log(response.data.error.message);
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};

const reload = () => {
  user.value = JSON.parse(localStorage.getItem("user")) ?? {};
  // load provinces
  provinceRepository.getAllProvinces().then((response) => {
    response.data.forEach((item) => {
      source.provinces.push({
        // text is require to show value in screen
        // id is require to select an option
        id: item.code,
        text: item.name,
      });
    });
  });
};

reload();

const edit = () => {
  isEdit.value = true;
};

const save = async () => {
  if (confirm("Bạn có muốn lưu thay đổi?")) {
    v$.value.$validate();
    if (v$.value.$invalid) {
      console.log("Vui lòng điền đầy đủ thông tin");
    } else updateInfo(user.value);
  }
};
</script>

<style scoped></style>
