<template>
  <div class="block-content pb-2">
    <div class="container">
      <div class="row">
        <div class="block-head-2">
          <div class="head-text">
            <router-link :to="{ name: 'home' }" style="color: #ed1a29"
              >Trang chủ</router-link
            >
            >>
            <router-link
              v-if="data.category"
              :to="{
                name: 'group_product',
                params: { id_category: data.category.id },
              }"
              style="color: #ed1a29"
            >
              {{ data.category.name }}
              <!-- 123 -->
            </router-link>
            >>
            {{ data.name }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12">
          <div class="detail-pro">
            <img
              class="img-detail"
              :src="choice.image ? choice.image : data.thumb"
            />
            <div class="block-khuyenmai">
              <div class="khuyenmai">
                <i class="far fa-star"></i> Tặng ngay quả bóng đá, giày bóng đá,
                găng tay thủ môn, phụ kiện bóng đá ... tùy theo số lượng đặt
                in.<br /><i class="fas fa-truck-pickup"></i> Miễn phí SHIP TOÀN
                QUỐC khi đặt ONLINE với hóa đơn trên 3 triệu.<br />
                <i class="fa fa-fire"></i> Cùng nhiều khuyến mãi hấp dẫn khác
                đang chờ bạn khám phá ^^
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
          <p class="text-1"></p>
          <div class="block-soluong">
            <h3>{{ data.name }}</h3>
            <p>
              {{ level_star }}&ensp;<i
                style="color: orange"
                class="fa-solid fa-star"
              ></i>
            </p>
            <div v-if="data.product_details && data.product_details.length > 0">
              <div class="price">
                {{ formatCash(choice.price) }}<sup>đ</sup>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Kích cỡ</label>&ensp;</div>
                <div class="col-9" v-if="sizes && sizes.length > 0">
                  <label
                    v-for="(size, key) in sizes"
                    v-bind:key="key"
                    class="radio"
                    @click="setSize(size)"
                  >
                    <input type="radio" name="size" />
                    <span>{{ size }}</span>
                  </label>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Màu sắc</label>&ensp;</div>
                <div class="col-9" v-if="colors && colors.length > 0">
                  <label
                    v-for="(color, key) in colors"
                    v-bind:key="key"
                    class="radio"
                    @click="setColor(color)"
                  >
                    <input type="radio" name="color" />
                    <span :style="`background-color: ${color};`"></span>
                  </label>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-3"><label>Số lượng: </label>&ensp;</div>
                <div class="col-9">
                  <input
                    type="button"
                    @click="decreaseQuantity"
                    value="-"
                    class="button"
                  />
                  <input
                    class="soluong"
                    type="number"
                    @input="updateQuantity"
                    v-model="choice.quantity"
                    id="quantity"
                    min="1"
                    name="quantity"
                  />
                  <input
                    type="button"
                    @click="increaseQuantity"
                    value="+"
                    class="button"
                  />
                  &ensp;
                  <label>{{ unit_in_stock }} sản phẩm có sẵn</label>
                </div>
              </div>
              <br />
              <div>
                <button class="giohang" id="add" @click="addProductToCart">
                  <i class="fas fa-cart-plus"></i>&ensp;Thêm vào giỏ</button
                >&emsp;
                <button class="giohang" id="add" @click="buyNow">
                  Mua ngay</button
                >&emsp;
              </div>
            </div>
            <div v-else>
              Sản phẩm đã hết hàng, vẫn còn rất nhiều sản phẩm tương tự chất
              lượng khác đang chờ bạn
              <router-link :to="{ name: 'home' }"> Click vào đây</router-link>
            </div>
          </div>
          <hr />
          <div class="text-3">
            Giá Hàng Có Sẵn: <label>80k - 120k - 160k và 220k</label>
          </div>
          <div class="text-3">
            Giá Hàng Đặt May: <label>Từ 150 đến 250k (liên hệ trực tiếp)</label>
          </div>
          <hr />
          <p class="text-4">(Nhận in từ 05 bộ trở lên - MIỄN PHÍ IN)</p>
          <div class="block-timework">
            <i class="fas fa-hand-point-right"></i> Mỗi sản phẩm được sản xuất
            nhiều chất liệu vải # nhau - Tương ứng với mỗi mức giá # nhau.<br />
            <i class="far fa-clock"></i> Giờ làm việc: 9h00 - 20h00 (Tất cả các
            ngày)<br />
            <i class="fas fa-truck-pickup"></i> Giao hàng toàn quốc: Từ 24 - 48h
            (cả thời gian in ấn)
          </div>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="table-size col-lg-6 col-md-12 col-sm-12">
          <table class="tbl-size" cellspacing="0">
            <th colspan="5">BẢNG SIZE ÁO BÓNG ĐÁ</th>
            <tr class="txt-head">
              <td>Size Châu Á</td>
              <td>M</td>
              <td>L</td>
              <td>XL</td>
              <td></td>
            </tr>
            <tr class="txt-head">
              <td>Size Châu Âu</td>
              <td>S</td>
              <td>M</td>
              <td>L</td>
              <td>XL</td>
            </tr>
            <tr>
              <td class="txt-head">Cân nặng</td>
              <td>40 - 54 kg</td>
              <td>55 - 65 kg</td>
              <td>65 - 76 kg</td>
              <td>77 - 99 kg</td>
            </tr>
            <tr>
              <td class="txt-head">Chiều cao</td>
              <td>1m50 - 1m66</td>
              <td>1m68 - 1m73</td>
              <td>1m74 - 1m80</td>
              <td>1m81 - 1m90</td>
            </tr>
            <tr>
              <td colspan="5" class="txt-end">
                (size XXL Châu Á chỉ áp dụng cho áo đặt may theo yêu cầu và
                không có sẵn)
              </td>
            </tr>
          </table>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12">
          <img class="img-size" src="../../assets/bang_size_giay.png" />
        </div>
        <br />
      </div>
      <br />
      <Rating
        :product_id="product_id"
        :user="user"
        :comments="comments"
        :showEditComment="showEditComment"
      />
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref, watch } from "vue";

import { useRouter } from "vue-router";

import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";
import Rating from "@/components/rates/Rating.vue";
import { formatCash } from "@/helpers/helper";
import { useToasted } from "@hoppscotch/vue-toasted";

const toast = useToasted();
const router = useRouter();
const clientRepository = RepositoryFactory.get("client");
const emitter = inject("emitter");

const domain = process.env.VUE_APP_DOMAIN_URL;
const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const product_id = parseInt(router.currentRoute.value.params.id);
const showRepComment = ref(-1);
const showEditComment = ref([]);

const level_star = ref(null);
const data = ref([]);
const sizes = ref([]);
const colors = ref([]);
const comments = ref([]);
const unit_in_stock = ref(0);
const choice = reactive({
  detail_id: -1,
  new_size: "",
  new_color: "",
  price: 0,
  quantity: unit_in_stock.value === 0 ? 0 : 1,
  image: "",
});

const user = ref(null);

emitter.on("reloadProductDetail", () => {
  reload();
});

// show edit comment
emitter.on("showEdit", (comment_id) => {
  if (!showEditComment.value.includes(comment_id)) {
    showEditComment.value.push(comment_id);
  } else {
    let index = showEditComment.value.indexOf(comment_id);
    if (index > -1) {
      // only splice array when item is found
      showEditComment.value.splice(index, 1); // 2nd parameter means remove one item only
    }
  }
});

// show reply comment
emitter.on("showReply", (comment_id) => {
  showRepComment.value = comment_id;
});

const reload = () => {
  // get detail product
  clientRepository.getDetailProduct(product_id).then((response) => {
    data.value = response.data.product;
    console.log(data.value);
    // get sizes and colors
    let size = [];
    let color = [];
    data.value.product_details.forEach((item) => {
      if (!size.includes(item.code_size)) {
        size.push(item.code_size);
      }
      if (!color.includes(item.code_color)) {
        color.push(item.code_color);
      }
    });
    sizes.value = size;
    colors.value = color;
    // get unit in stock
    getUnitInStock();
    choice.price = data.value.price ?? 0;
    // get comments
    comments.value = response.data.product.comments;
    // level star
    level_star.value = response.data.level_star;
    // reply_content.value = "";
    showRepComment.value = -1;
    showEditComment.value = [];
    //
    user.value = JSON.parse(localStorage.getItem("user"));
  });
};

reload();

// set size
const setSize = (size) => {
  choice.new_size = size;
  getUnitInStock();
};

// set color
const setColor = (color) => {
  choice.new_color = color;
  getUnitInStock();
};

// get unit in stock
const getUnitInStock = () => {
  choice.quantity = 1;
  let correctItem;
  data.value.product_details.forEach((item) => {
    console.log(item);
    if (
      item.code_color === choice.new_color &&
      item.code_size === choice.new_size
    ) {
      correctItem = item;
    }
  });
  if (correctItem) {
    choice.detail_id = correctItem.id;
    choice.image = correctItem.thumb;
    unit_in_stock.value = correctItem.unit_in_stock;
  } else {
    unit_in_stock.value = 0;
  }
};

// decrease quantity
const decreaseQuantity = () => {
  if (unit_in_stock.value > 0 && choice.quantity > 1) {
    choice.quantity--;
  }
};

// update quantity
const updateQuantity = () => {
  if (choice.quantity < 0 || !Number.isInteger(choice.quantity)) {
    choice.quantity = 1;
  }
  if (choice.quantity > unit_in_stock.value) {
    choice.quantity = unit_in_stock.value;
  }
};

// increase quantity
const increaseQuantity = () => {
  if (unit_in_stock.value > 0 && choice.quantity < unit_in_stock.value) {
    choice.quantity++;
  }
};
// add product to carts
const addProductToCart = () => {
  if (!choice.new_size || !choice.new_color) {
    toast.error("Chưa chọn đủ thông tin sản phẩm", {
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
    return false;
  }
  if (unit_in_stock.value === 0) {
    toast.error("Sản phẩm đã hết", {
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
    return false;
  }
  // get carts in localStorage
  let carts = [];
  let count = 0;
  if (localStorage.getItem("carts")) {
    carts = JSON.parse(localStorage.getItem("carts"));
  }
  // update quantity if exists product in carts
  if (carts.length > 0) {
    carts.forEach((item) => {
      if (
        item.product_id == product_id &&
        item.code_color === choice.new_color &&
        item.code_size === choice.new_size
      ) {
        count++;
        if (item.quantity + choice.quantity <= unit_in_stock.value) {
          item.quantity += choice.quantity;
          toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
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
          toast.error("Sản phẩm trong giỏ hàng đã đạt số lượng tối đa", {
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
          return false;
        }
      }
    });
  }
  //
  if (count === 0) {
    carts.push({
      detail_id: choice.detail_id,
      product_id: product_id,
      code_color: choice.new_color,
      code_size: choice.new_size,
      quantity: choice.quantity,
      unit_price: choice.price,
      thumb: data.value.thumb,
      name: data.value.name,
    });
    toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
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
  localStorage.setItem("carts", JSON.stringify(carts));
  // change count quantity cart
  emitter.emit("reloadHeader");

  return true;
};
// buy now
const buyNow = () => {
  if (addProductToCart()) {
    router.push({
      path: "/carts",
    });
  }
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
  padding: 15px 0px;
}
.img-size {
  width: 100%;
  height: 100%;
}
.img-detail {
  width: 100%;
  height: 400px;
}
/* .block-content */
.block-content {
  margin: 0 10%;
  box-shadow: 0px 4px 8px 0px rgb(207, 200, 200);
}

.block-khuyenmai {
  margin-top: 10px;
}

.block-khuyenmai .khuyenmai {
  background-color: rgb(248, 28, 138);
  color: white;
  padding: 5px;
}

.block-soluong {
  margin-left: 15%;
}
.price {
  color: #ed1a29;
  font-size: 25px;
}
.giohang {
  color: white;
  background-color: #2e3094;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  border: none;
}

.giohang:hover {
  background-color: #ed1a29;
}

.text-1 {
  font-weight: bold;
  font-size: 25px;
}

.text-3 {
  font-weight: bold;
  border: 1px dashed #ed1a29;
  max-width: 450px;
  margin: 10px 15%;
  padding: 10px;
}

.text-3 label {
  font-weight: normal;
}

.text-4 {
  text-align: center;
}

.block-timework {
  padding: 0px 0px 0px 10px;
  color: #2e3094;
  background-color: rgb(233, 233, 14);
}

input.button {
  border: none;
  background-color: red;
  color: white;
  width: 30px;
  height: 30px;
  margin: 0px 10px 0px 10px;
  border-radius: 5px;
  font-size: 20px;
}

.soluong {
  width: 50px;
  border: none;
}

/* .block-table */

.tbl-size {
  justify-content: center;
  border: 1px solid #ed1a29;
  padding: 0px 80px;
  width: 100%;
}

.table-size td {
  padding: 5px;
  border: 1px solid #ed1a29;
}

.table-size th {
  padding: 10px;
  color: white;
  background-color: #ed1a29;
}

.txt-head {
  font-weight: bold;
}

td.txt-end {
  font-style: italic;
}

label.radio {
  cursor: pointer;
}
label.radio input {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
label.radio span {
  margin-right: 10px;
  padding: 7px 14px;
  border: 1px solid black;
  display: inline-block;
  color: black;
  border-radius: 3px;
  text-transform: uppercase;
}
label.radio input:checked + span {
  background-color: #2e3094;
  box-shadow: 0 3px 3px rgb(6, 5, 5);
  color: #fff;
}
</style>
