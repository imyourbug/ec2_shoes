<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Thống kê</h1>

    <!-- Content Row -->
    <div class="row">
      <div class="col-xl-8 col-lg-7">
        <!-- Area Chart -->
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="mb-2 font-weight-bold text-primary">
              Doanh thu theo tháng
            </h6>
            <label>Từ</label>&emsp13;
            <input
              type="date"
              v-model="range.from"
              @change="reloadRevenue"
            />&emsp13; <label>đến</label>&emsp13;
            <input type="date" v-model="range.to" @change="reloadRevenue" />
          </div>
          <div class="card-body">
            <div class="chart-area">
              <table>
                <tr>
                  <td>Doanh thu tháng hiện tại:</td>
                  <td>&emsp13;</td>
                  <td>{{ formatCash(revenueThisMonth) }} VNĐ</td>
                </tr>
                <tr>
                  <td>Tổng doanh thu:</td>
                  <td>&emsp13;</td>
                  <td>{{ formatCash(totalRevenue) }} VNĐ</td>
                </tr>
              </table>
              <canvas id="chartRevenue"></canvas>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
            <h6 class="font-weight-bold text-primary">
              Số lượng hàng tồn trong kho
            </h6>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-pie">
              <canvas id="chartQuantity"></canvas>
            </div>
            <hr />
            <table>
              <tr>
                <td>Số sản phẩm:</td>
                <td>&emsp13;</td>
                <td>{{ products.length }}</td>
              </tr>
              <tr>
                <td>Số hàng tồn trong kho:</td>
                <td>&emsp13;</td>
                <td>{{ dataQuantity.reduce((a, b) => a + b, 0) }}</td>
              </tr>
              <tr>
                <td>Sản phẩm bán chạy nhất:</td>
                <td>&emsp13;</td>
                <td v-if="bestSeller">{{ bestSeller.name }}</td>
              </tr>
            </table>
            <router-link class="collapse-item" :to="{ name: 'import-product' }"
              >Quản lý kho hàng</router-link
            >
          </div>
        </div>
      </div>
      <!-- Donut Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3">
            <h6 class="font-weight-bold text-primary">Đơn hàng</h6>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <!-- <div class="" v-if="bestSeller">
              Sản phẩm bán chạy nhất:
              <router-link
                :to="{
                  name: 'product_detail',
                  params: { id: bestSeller.id },
                }"
                >{{ bestSeller.name }}
              </router-link>
            </div> -->
            <table>
              <tr>
                <td>Tổng số đơn đã đặt:</td>
                <td>&emsp13;</td>
                <td>{{ orders.length }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đang chờ xác nhận:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(0) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đang chờ lấy hàng:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(1) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đang giao:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(2) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đang chờ hủy:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(3) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đã hủy:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(4) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đã giao thành công:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(5) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đang trả hàng:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(6) }}</td>
              </tr>
              <tr>
                <td>Tổng số đơn đã trả hàng:</td>
                <td>&emsp13;</td>
                <td>{{ getTypeOrder(7) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { formatCash } from "@/helpers/helper";
import Chart from "chart.js/auto";

import { RepositoryFactory } from "@/api/repositories/RepositoryFactory.js";

const productRepository = RepositoryFactory.get("product");
const statisticRepository = RepositoryFactory.get("statistic");
const orderRepository = RepositoryFactory.get("order");

const dataQuantity = ref([]);
const labelsQuantity = ref([]);
const backgroundColorQuantity = ref([]);
const backgroundColorRevenue = ref([]);
const dataRevenue = ref([]);
const labelsRevenue = ref([]);
const bestSeller = ref(null);
const orders = ref([]);
const totalRevenue = ref(0);
const revenueThisMonth = ref(0);
const products = ref([]);
const range = reactive({
  from: "",
  to: "",
});

const reload = () => {
  getAllOrder();
  reloadQuantity();
  reloadRevenue();
};

const getTypeOrder = (status) => {
  return orders.value.filter((i) => {
    return i.status === status;
  }).length;
};

const getAllOrder = () => {
  orderRepository.getAllOrders().then((response) => {
    if (response.data.status === 0) {
      orders.value = response.data.orders;
    }
  });
};

var chartRevenue = null;
var chartQuantity = null;

const reloadQuantity = () => {
  productRepository.getAll().then((response) => {
    if (response.data.status === 0) {
      labelsQuantity.value = [];
      dataQuantity.value = [];
      backgroundColorQuantity.value = [];
      products.value = response.data.products;
      let max = 0;
      products.value.forEach((e) => {
        if (max < e.sold) {
          max = e.sold;
          bestSeller.value = e;
        }
        labelsQuantity.value.push(e.name);
        dataQuantity.value.push(getQuantity(e.product_details));
        backgroundColorQuantity.value.push(getRandomRGBColor());
      });
      console.log(bestSeller.value);
      if (chartQuantity) {
        chartQuantity.data.labels = labelsQuantity.value;
        chartQuantity.data.datasets[0].data = dataQuantity.value;
        chartQuantity.data.datasets[0].backgroundColor =
          backgroundColorQuantity.value;
        chartQuantity.update();
      }
    }
    if (response.data.status === 1) {
    }
  });
};

const reloadRevenue = () => {
  statisticRepository.getRevenueByMonth(range).then((response) => {
    if (response.data.status === 0) {
      labelsRevenue.value = [];
      dataRevenue.value = [];
      backgroundColorRevenue.value = [];
      totalRevenue.value = 0;
      let date = new Date();
      response.data.data.forEach((e) => {
        revenueThisMonth.value += parseInt(
          e.month == date.getMonth() && e.year == date.getFullYear()
            ? e.revenue
            : 0
        );
        labelsRevenue.value.push(`${e.month}/${e.year}`);
        backgroundColorRevenue.value.push(getRandomRGBColor());
        dataRevenue.value.push(e.revenue);
        console.log(e.revenue);
        totalRevenue.value += parseInt(e.revenue);
      });
      if (chartRevenue) {
        chartRevenue.data.labels = labelsRevenue.value;
        chartRevenue.data.datasets[0].data = dataRevenue.value;
        chartRevenue.data.datasets[0].backgroundColor =
          backgroundColorRevenue.value;
        chartRevenue.update();
      }
    }
  });
};

const getQuantity = (product_details) => {
  let rs = 0;
  product_details.forEach((e) => {
    rs += e.unit_in_stock;
  });

  return rs;
};

const getConfig = (
  labels,
  data,
  label,
  type,
  backgroundColor = [],
  options = { scales: {} }
) => {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderWidth: 1,
          backgroundColor: backgroundColor,
        },
      ],
    },
    options: options,
  };
};

const getRandomRGBColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

onMounted(() => {
  reload();
  chartRevenue = new Chart(
    $("#chartRevenue"),
    getConfig(
      labelsRevenue.value,
      dataRevenue.value,
      "Doanh thu",
      "bar",
      backgroundColorRevenue.value
    )
  );

  chartQuantity = new Chart(
    $("#chartQuantity"),
    getConfig(
      labelsQuantity.value,
      dataQuantity.value,
      "Số lượng hàng trong kho",
      "doughnut",
      backgroundColorQuantity.value
    )
  );
});
</script>
<style scoped></style>
