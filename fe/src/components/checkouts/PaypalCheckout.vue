<template>
  <div id="paypal-button"></div>
</template>

<script setup>
import {
  defineProps,
  inject,
  onUnmounted,
} from 'vue';

const emitter = inject("emitter");

const props = defineProps({
  total_money: Number,
});

const loadAsync = (url, callback) => {
  var s = document.createElement("script");
  s.setAttribute("src", url);
  s.onload = callback;
  document.head.insertBefore(s, document.head.firstElementChild);
};

loadAsync(
  "https://www.paypal.com/sdk/js?client-id=test&currency=USD",
  function () {
    paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 40,
          tagline: false,
          layout: "horizontal",
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: VNDtoUSD(props.total_money),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            emitter.emit("checkoutSuccess", props.total_money);
          } else alert("Thanh toán thất bại");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render("#paypal-button");
  }
);

// change vnd to usd
const VNDtoUSD = (money) => {
  return Math.round((money / 24000) * 100) / 100;
};

onUnmounted(() => {
  emitter.off("checkoutSuccess");
});
</script>
<style scoped></style>