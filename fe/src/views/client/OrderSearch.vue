<template>
  <div class="row">
    <div class="block-head-2">
      <div class="head-text">
        <router-link :to="{ name: 'home' }" style="color: #ed1a29"
          >Trang chủ</router-link
        >>>
        <a style="color: #ed1a29" href="#"> Tra cứu đơn hàng </a>
        >>
        <a style="color: #ed1a29" href="#">
          {{ key_word }}
        </a>
      </div>
    </div>
  </div>
  <div class="text-center">
    <p class="fw-bold fs-4">TRA CỨU ĐƠN HÀNG</p>
    <div class="d-flex justify-content-center mt-3">
      <input
        required=""
        type="text"
        class="form-control text-uppercase"
        placeholder="Mã đơn hàng"
        v-model="info.id"
        style="width: 400px"
      />
    </div>
    <div :class="{ error: v$.id.$errors.length }">
      <div
        class="input-errors"
        v-for="error of v$.id.$errors"
        :key="error.$uid"
      >
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-3">
      <input
        required=""
        type="text"
        v-model="info.email"
        class="form-control"
        placeholder="Email"
        style="width: 400px"
      /><br />
    </div>
    <div :class="{ error: v$.email.$errors.length }">
      <div
        class="input-errors"
        v-for="error of v$.email.$errors"
        :key="error.$uid"
      >
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>
    <button
      style="max-width: fit-content !important"
      class="btn btn-success mt-3 mb-3"
      @click="search"
    >
      TRA CỨU ĐƠN HÀNG
    </button>
  </div>
  <Detail
    v-if="order"
    class="modal fade"
    id="modalDetail"
    :order="order"
    @change-status="changeStatus"
  />
  <input type="hidden"  data-toggle="modal" 
        data-target="#modalDetail" id="openDetail"/>
</template>

<script setup>
import {
  reactive,
  ref,
} from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import Detail from '@/components/users/orders/Detail.vue';
import { useToasted } from '@hoppscotch/vue-toasted';
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  helpers,
  required,
} from '@vuelidate/validators';

const toast = useToasted();
const orderRepository = RepositoryFactory.get("order");

const order = ref(null);
const info = reactive({
  id: "",
  email: "",
});

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

// validate
const rules = {
  id: { required: helpers.withMessage("Không được để trống!", required) },
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
};

const v$ = useVuelidate(rules, info);

const search = () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
    toast.error("Vui lòng điền đầy đủ thông tin", {
      duration: duration_time,
      action: [
        {
          text: `OK`,
          onClick: (_, toastObject) => {
            toastObject.goAway(0);
          },
        },
      ],
    });
  } else {
    orderRepository.searchOrder(info).then((response) => {
      if (response.data.status === 0) {
        order.value = response.data.order;
        console.log(order.value);
        $('#openDetail').click();
      }
      if (response.data.status === 1) {
        toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
      }
      if (response.data.status !== 1 && response.data.status !== 0) {
        console.log(response);
      }
    });
  }
};

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
};

const changeStatus = (status_order) => {
  orderRepository.edit(info.id, status_order).then((response) => {
    if (response.data.status === 0) {
      closeModal("modalDetail");
      toast.success("Cập nhật đơn hàng thành công", {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status === 1) {
      toast.error(response.data.error.message, {
        duration: duration_time,
        action: [
          {
            text: `OK`,
            onClick: (_, toastObject) => {
              toastObject.goAway(0);
            },
          },
        ],
      });
    }
    if (response.data.status !== 1 && response.data.status !== 0) {
      console.log(response);
    }
  });
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.block-head-2 {
  align-items: center;
  padding: 10px 0px 0px 10px;
}

.block-head-2 a {
  color: black;
}

.block-head-2 a:hover {
  text-decoration: underline;
}
.head-text {
  padding: 15px 160px;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
</style>
