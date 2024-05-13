<template>
  <div
    class="modal fade"
    id="modalConfirm"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết đơn hàng</h5>
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
        <div class="modal-body">
          <div class="title">Xác nhận</div>
          <div class="row">
            <div class="col-4">Họ tên</div>
            <div class="col-8">
              {{ customer.name }}
            </div>
          </div>
          <div class="row">
            <div class="col-4">Email</div>
            <div class="col-8">{{ customer.email }}</div>
          </div>
          <div class="row">
            <div class="col-4">Địa chỉ</div>
            <div class="col-8">{{ customer.address }}</div>
          </div>
          <div class="row">
            <div class="col-4">Số điện thoại</div>
            <div class="col-8">{{ customer.phone }}</div>
          </div>
          <div class="row">
            <div class="col-4">Ghi chú</div>
            <div class="col-8">{{ customer.note ?? "Trống" }}</div>
          </div>
          <div class="row">
            <div class="col-4">Tổng tiền</div>
            <div class="col-8">{{ formatCash(totalMoney) }}<sup>đ</sup></div>
          </div>
          <br />
        </div>
        <div class="modal-footer">
          <button
            v-if="payment_method == 0"
            class="btn btn-success"
            id="btn-confirm"
            @click="checkOut(totalMoney)"
          >
            Xác nhận
          </button>
          <div class="checkout" v-if="payment_method == 1">
            <button
              @click="checkOutVnpay(totalMoney)"
              class="btn btn-info btn-rounded btn-vnpay"
            >
              VNPAY
            </button>
            <br />
            <br />
            <PaypalCheckout
              class="btn-paypal"
              :total_money="totalMoney"
            ></PaypalCheckout>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import PaypalCheckout from '@/components/checkouts/PaypalCheckout.vue';
import { formatCash } from '@/helpers/helper';

const props = defineProps({
  voucherSelected: Object,
  customer: Object,
  toast: Object,
  totalMoney: Number,
  payment_method: Number,
  duration_time: String,
  checkOut: Function,
});

const clientRepository = RepositoryFactory.get("client");

const checkOutVnpay = (total) => {
  clientRepository.checkOutVnpay(total).then((response) => {
    if (response.data.status === 0) {
      var newWin = window.open(
        response.data.url,
        "windowName",
        "height=600,width=600"
      );
      window.addEventListener("message", function (event) {
        if (event.origin !== window.location.origin) {
          return;
        }
        if (
          event.data.vnp_ResponseCode == "00" ||
          event.data.vnp_TransactionStatus == "00"
        ) {
          props.checkOut(total);
        }
      });
    }
    if (response.data.status === 1) {
      props.toast.error(response.data.error.message, {
        duration: props.duration_time,
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
.btn-vnpay,
.btn-paypal {
  width: 100%;
  height: 100%;
}
</style>
