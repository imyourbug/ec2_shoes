<template>
  <div class="block-content">
    <div class="block-head-2">
      <div class="head-text">
        <router-link :to="{ name: 'home' }" style="color: #ed1a29"
          >Trang chủ</router-link
        >
        >> Giỏ hàng
      </div>
    </div>
    <div class="in-content">
      <div class="content-top">
        <div class="out-texthead">
          <div class="text-head">
            <i class="fas fa-shopping-basket"></i>&ensp;<span class="txt-home"
              >THÔNG TIN GIỎ HÀNG CỦA BẠN</span
            >
          </div>
        </div>
        <table
          cellspacing="0"
          class="table-product"
          v-if="carts && carts.length > 0"
        >
          <thead class="tbl-text-head">
            <tr>
              <th class="">Hình ảnh</th>
              <th class="col-sm">Tên sản phẩm</th>
              <th class="col-lg col-md col-sm">Đơn giá</th>
              <th class="col-lg col-md col-sm">Size</th>
              <th class="col-lg col-md col-sm">Màu</th>
              <th class="col-md col-sm">Số lượng</th>
              <th class="col-lg col-md col-sm">Thành tiền</th>
              <th class="">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, key) in carts" :key="key">
              <td class="col-img">
                <img
                  style="width: 100px; height: 100px"
                  :src="product.thumb"
                />&emsp;
              </td>
              <td class="col-sm" style="min-width: 150px">
                {{ product.name }}
              </td>
              <td class="col-dongia col-lg col-md col-sm">
                {{ formatCash(product.unit_price) }}<sup>đ</sup>
              </td>
              <td class="col-size col-lg col-md col-sm">
                {{ product.code_size }}
              </td>
              <td class="col-color col-lg col-md col-sm">
                {{ getNameByHexColor(product.code_color) }}
              </td>
              <td class="col-soluong col-md col-sm">
                <input
                  @click="decreaseQuantity(product.detail_id, product.quantity)"
                  type="button"
                  value="-"
                  class="button"
                />
                <input
                  @input="updateQuantity(product.detail_id, product.quantity)"
                  style="width: 50px"
                  type="number"
                  min="1"
                  v-model="product.quantity"
                />
                <input
                  @click="increaseQuantity(product.detail_id, product.quantity)"
                  type="button"
                  value="+"
                  class="button"
                />
              </td>
              <td class="col-thanhtien col-lg col-md col-sm">
                {{ formatCash(product.unit_price * product.quantity)
                }}<sup>đ</sup>
              </td>
              <td class="col-thaotac">
                <div class="">
                  <i
                    @click="removeProduct(product.detail_id)"
                    class="delete-product fas fa-trash-alt"
                  ></i>
                </div>
                <router-link
                  :to="`/products/detail/${product.product_id}`"
                  class="info-product"
                >
                  <i class="fas fa-info-circle"></i>
                </router-link>
              </td>
            </tr>
            <tr style="border: none">
              <td colspan="7">
                <div class="total">
                  Tổng tiền: {{ formatCash(totalMoney()) }}<sup>đ</sup>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="row-end-money" v-else>
          <CartEmpty />
        </div>
        <div class="button-home" v-if="carts && carts.length > 0">
          <router-link class="btn-home" :to="{ name: 'home' }">
            <i class="fas fa-arrow-left"></i
            ><span class="txt-home"> Tiếp tục mua hàng</span>
          </router-link>
        </div>
      </div>
      <br />

      <br />
    </div>
    <div class="content-bot" v-if="carts && carts.length > 0">
      <div class="out-texthead">
        <div class="text-head text-head-left">
          <i class="fas fa-dolly-flatbed"></i>&ensp;<span class="txt-home"
            >THÔNG TIN GIAO HÀNG</span
          >
        </div>
        <div class="text-head text-head-right">
          <i class="fas fa-dollar-sign"></i>&ensp;<span class="txt-home"
            >THANH TOÁN</span
          >
        </div>
      </div>
      <div class="row">
        <div class="information col-lg-7 col-md-12 col-sm-12">
          <div class="text-hint">
            * Vui lòng nhập đầy đủ thông tin để chúng tôi giao hàng được chính
            xác, cảm ơn!
          </div>
          <div class="input-text">
            <input
              id="ten"
              type="text"
              v-model="customer.name"
              placeholder="Tên đầy đủ của bạn"
            />
            <p>*</p>
            &emsp;
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
          <div class="input-text">
            <input
              id="email"
              type="email"
              v-model="customer.email"
              placeholder="Email của bạn"
            />
            <p>*</p>
            &emsp;
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
          <div class="text-hint">* Địa chỉ nhận hàng</div>
          <div class="input-text">
            <input
              id="sonha"
              type="text"
              v-model="customer.address"
              placeholder="Số nhà, đường, (tòa nhà), phường/xã..."
            />
            <p>*</p>
            &emsp;
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
          <div class="input-text">
            <input
              id="sdt"
              type="text"
              placeholder="Số điện thoại"
              v-model="customer.phone"
            />
            <p>*</p>
            &emsp;
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
          <div class="text-hint">* Phương thức thanh toán</div>
          <select class="form-select" v-model="payment_method">
            <option value="0">Tiền mặt</option>
            <option value="1">Ngân hàng</option>
          </select>
          <div class="text-hint">* Phương thức vận chuyển</div>
          <select class="form-select" v-model="shipment">
            <option
              v-for="(shipment, key) in shipments"
              :key="key"
              :value="shipment"
            >
              {{ shipment.name }}
            </option>
          </select>
          <div class="text-hint">* Ghi chú</div>
          <textarea
            id="mota"
            rows="2"
            cols="60"
            placeholder="Giao cho tôi vào giờ hành chính"
            v-model="customer.note"
          ></textarea>
          <br />
        </div>
        <div class="information col-lg-5 col-md-12 col-sm-12">
          <br />
          <label for="">Voucher</label>
          <Select2
            style="width: 100%"
            v-model="voucher"
            :options="vouchers"
            :settings="{ settingOption: value, settingOption: value }"
            @select="selectVoucher($event)"
          />
          <h4>{{ value }}</h4>
          <div class="" style="display: flex; justify-content: space-between">
            <label for="">Phí vận chuyển</label>
            <p>{{ formatCash(shipment.fee ?? 30000) }}<sup>đ</sup></p>
          </div>
          <div class="" style="display: flex; justify-content: space-between">
            <label for="">Mã giảm giá</label>
            <p>
              {{
                voucherSelected.discount
                  ? formatCash(
                      parseInt((voucherSelected.discount / 100) * totalMoney())
                    )
                  : 0
              }}<sup>đ</sup>
            </p>
          </div>
          <div class="" style="display: flex; justify-content: space-between">
            <label>Tổng thanh toán</label>
            <p>
              {{
                formatCash(
                  (voucherSelected.discount
                    ? parseInt(
                        (1 - voucherSelected.discount / 100) * totalMoney()
                      )
                    : parseInt(totalMoney())) + shipment.fee
                )
              }}<sup>đ</sup>
            </p>
          </div>
          <button
            data-target="#modalConfirm"
            data-toggle="modal"
            class="btn-buy"
            @click="order"
          >
            <i class="fas fa-dollar-sign"></i> Đặt hàng
          </button>
        </div>
      </div>
    </div>
  </div>
  <ModalConfirm
    v-if="!v$.$invalid"
    :voucherSelected="voucherSelected"
    :customer="customer"
    :totalMoney="
      (voucherSelected.discount
        ? parseInt((1 - voucherSelected.discount / 100) * totalMoney())
        : parseInt(totalMoney())) + shipment.fee
    "
    :checkOut="checkOut"
    :toast="toast"
    :payment_method="payment_method"
    :duration_time="duration_time"
  />
</template>

<script setup>
import { computed, inject, reactive, ref, watch } from "vue";

import ntc from "ntc-hi-js";
import { useStore } from "vuex";
import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import CartEmpty from "@/components/carts/CartEmpty.vue";
import ModalConfirm from "@/components/carts/ModalConfirm.vue";
import { formatCash } from "@/helpers/helper.js";
import { useVuelidate } from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { useToasted } from "@hoppscotch/vue-toasted";

const toast = useToasted();
const store = useStore();
const clientRepository = RepositoryFactory.get("client");
const emitter = inject("emitter");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const domain = process.env.VUE_APP_DOMAIN_URL ?? "";
const payment_method = ref(0);
const shipment = ref([]);
const voucherSelected = ref([]);
// const user = JSON.parse(localStorage.getItem("user"));
const user = JSON.parse(localStorage.getItem("user"));

const customer = reactive({
  name: user?.name ?? "",
  email: user?.email ?? "",
  address:
    `${user?.street ?? ""} - ${user?.ward ?? ""} - ${user?.district ?? ""} - ${
      user?.province ?? ""
    }` ?? "",
  phone: user?.phone ?? "",
  note: "",
});

const data = computed(() => {
  return store.state.detail_products.all;
});

const shipments = computed(() => {
  shipment.value = store.state.shipments.all[0] ?? [];
  return store.state.shipments.all;
});

const carts = ref([]);

const vouchers = computed(() => {
  return store.state.vouchers.all.map((item) => {
    return {
      text: item.name,
      ...item,
    };
  });
});

// validate
const valid_number_phone = helpers.regex(/^0\d{9}$/);

const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
  address: { required: helpers.withMessage("Không được để trống!", required) },
  phone: {
    required: helpers.withMessage("Không được để trống!", required),
    valid_number_phone: helpers.withMessage(
      "Số điện thoại không hợp lệ!",
      valid_number_phone
    ),
  },
};

const v$ = useVuelidate(rules, customer);

emitter.on("checkoutSuccess", (total_money) => {
  // insert data to database
  checkOut(total_money);
});

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
};

const checkOut = (total_money) => {
  let data = {
    customer: customer,
    carts: carts.value,
    discount: voucherSelected.value.discount ?? 0,
    total_money: total_money,
    payment_method: payment_method.value,
    payment_status: payment_method.value === 0 ? 0 : 1,
    shipment_id: shipment.value.id,
  };
  $("#btn-confirm").prop("disabled", true);
  clientRepository.createOrder(data).then((response) => {
    if (response.data.status === 0) {
      // reset carts
      carts.value = [];
      localStorage.setItem("carts", JSON.stringify(carts.value));
      localStorage.removeItem("customer");
      emitter.emit("reloadHeader");
      $("#btn-confirm").prop("disabled", false);
      closeModal("modalConfirm");
      loadCart();
      toast.success("Thanh toán thành công", {
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
      $("#btn-confirm").prop("disabled", false);
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
      $("#btn-confirm").prop("disabled", false);
      console.log(response);
    }
  });
};

const loadCart = () => {
  carts.value = JSON.parse(localStorage.getItem("carts"));
};

// order
const order = () => {
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
    localStorage.setItem("customer", JSON.stringify(customer));
  }
};

const selectVoucher = (voucher) => {
  voucherSelected.value = voucher;
};

const reload = async () => {
  store.dispatch("shipments/getAll");
  store.dispatch("vouchers/getAll");
  store.dispatch("detail_products/getAll");
  loadCart();
};

reload();

// decrease quantity
const decreaseQuantity = (detail_id, quantity) => {
  if (quantity > 1) {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
        item.quantity -= 1;
      }
    });
  } else {
    removeProduct(detail_id);
    return;
  }
  localStorage.setItem("carts", JSON.stringify(carts.value));
};

// increase quantity
const increaseQuantity = (detail_id, quantity) => {
  if (quantity < getQuantity(detail_id)) {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
        item.quantity += 1;
      }
    });
  } else {
    toast.error("Bạn đã đạt mức tối đa số lượng sản phẩm này", {
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
  localStorage.setItem("carts", JSON.stringify(carts.value));
};

// update quantity
const updateQuantity = (detail_id, quantity) => {
  if (quantity < getQuantity(detail_id)) {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
        item.quantity =
          quantity < 0 || !Number.isInteger(quantity) ? 1 : quantity;
      }
    });
  } else {
    carts.value.forEach((item) => {
      if (item.detail_id === detail_id) {
        item.quantity = getQuantity(detail_id);
      }
    });
    toast.error("Bạn đã đạt mức tối đa số lượng sản phẩm này", {
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
  console.log(detail_id, quantity);
  localStorage.setItem("carts", JSON.stringify(carts.value));
};

// get name color
const getNameByHexColor = (hexCode) => {
  return ntc.name(hexCode, "en").color.name;
};

// get quantity by detail_id
const getQuantity = (detail_id) => {
  let unit_in_stock = 0;
  data.value.forEach((item) => {
    if (item.id === detail_id) {
      unit_in_stock = item.unit_in_stock;
    }
  });

  return unit_in_stock;
};

// remove product from carts
const removeProduct = (id) => {
  if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
    let products = carts.value.filter((product) => product.detail_id !== id);
    carts.value = products;
    localStorage.setItem("carts", JSON.stringify(carts.value));
    toast.success("Xóa sản phẩm khỏi giỏ hàng thành công", {
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
    emitter.emit("reloadHeader");
  }
};

// total money
const totalMoney = () => {
  let total = 0;
  if (carts.value) {
    carts.value.forEach((item) => {
      total += item.quantity * item.unit_price;
    });
  }

  return total;
};
</script>

<style scoped>
@media (max-width: 1000px) {
  .col-lg {
    display: none;
  }
}

@media (max-width: 620px) {
  .col-md,
  .text-head-right {
    display: none;
  }
}

@media (max-width: 440px) {
  .col-md,
  .txt-home,
  .col-sm {
    display: none;
  }
}
.table-payment {
  width: 100%;
}
.col-infor2 {
  text-align: right;
}
.total-money {
  font-weight: bold;
  color: #ed1a29;
}
* {
  margin: 0;
  padding: 0;
  outline: none;
}
a {
  text-decoration: none;
}
/* .block-head-2 */
.block-head-2 {
  background-color: rgb(246, 249, 252);
  align-items: center;
  padding: 10px 0px 10px 0px;
}
.block-head-2 a {
  color: black;
}
.block-head-2 a:hover {
  text-decoration: underline;
}
.head-text {
  padding: 15px 0px;
}
/* .block-content */
.block-content {
  margin: 0 10%;
  padding: 10px;
  box-shadow: 0px 4px 8px 0px rgb(207, 200, 200);
}
/* .conten-top */
.table-product tr th {
  text-align: center;
  padding: 15px 0px 15px 0px;
}
.table-product tr {
  border-bottom: 1px solid rgb(200, 201, 202);
}
.table-product {
  width: 100%;
}
td img {
  width: 80px;
  height: 80px;
  padding: 10px;
}
.col-thaotac {
  width: 320px;
  align-items: center;
  text-align: center;
}
.in-thaotac {
  display: flex;
  justify-content: center;
  align-items: center;
}
.col-img {
}
.col-thanhtien,
.col-dongia {
  width: 230px;
  text-align: right;
  padding-right: 50px;
}
.col-soluong,
.col-color {
  width: 200px;
  text-align: left;
  padding-left: 40px;
}
.col-voucher {
  width: 70%;
}
td .button,
td button {
  border: none;
  background-color: #ed1a29;
  color: white;
  padding: 0px 12px;
  border-radius: 5px;
  font-size: 20px;
}
.row-end-money {
  font-weight: bold;
  color: #ed1a29;
  font-size: 20px;
  text-align: center;
  padding: 40px 0px;
}

.delete-product {
  padding: 8px 8px;
  border-radius: 10px;
  background-color: #ed1a29;
  color: white;
}
a.info-product {
  color: #2e3094;
  font-size: 30px;
}
/*  */
.total {
  font-weight: bold;
  text-align: right;
  padding: 10px 0px;
  font-size: 20px;
}
.total input {
  border: none;
  color: #ed1a29;
  font-weight: bold;
}
/*  */
.button-home .btn-home {
  background-color: #2e3094;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
}
.button-home .btn-home:hover {
  background-color: #ed1a29;
}
.out-texthead {
  border-bottom: 1px solid #ed1a29;
  display: flex;
  justify-content: space-between;
}
.text-head {
  font-size: 20px;
  padding: 5px 0px 5px 10px;
  background-color: #ed1a29;
  width: 40%;
  color: white;
  text-align: left;
}
/* content-bot */
.information {
  padding-left: 10px;
}
.information .text-hint {
  padding: 25px 0px 15px 0px;
}
.information input {
  padding-left: 10px;
  margin-bottom: 5px;
  width: 300px;
}
.information p {
  color: red;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
.input-text {
  display: flex;
}
textarea {
  border-radius: 5px;
  border: 1px solid rgb(208, 212, 216);
  width: 80%;
}
textarea {
  padding-left: 10px;
}
.input-text p {
  padding-left: 15px;
  align-items: center;
}
.btn-buy {
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #2e3094;
  color: white;
}
.btn-buy:hover {
  background-color: red;
}

.form-select,
.input-text input {
  border-radius: 5px;
  border: 1px solid rgb(208, 212, 216);
  width: 80%;
  padding: 10px 10px;
}

@media (max-width: 800px) {
  .col-lg {
    display: none;
  }
}

@media (max-width: 620px) {
  .col-md {
    display: none;
  }
}

@media (max-width: 440px) {
  .col-md,
  .col-sm {
    display: none;
  }
}
</style>
