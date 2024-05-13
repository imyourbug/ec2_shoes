<template>
  <div>
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết đơn hàng</h5>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <table class="tbl-info">
              <tr>
                <td class="fw-bold">Mã đơn hàng</td>
                <td>{{ order.id }}</td>
              </tr>
              <tr>
                <td class="fw-bold">Khách hàng</td>
                <td>{{ order.customer.name }}</td>
              </tr>
              <tr>
                <td class="fw-bold">Số điện thoại</td>
                <td>{{ order.customer.phone }}</td>
              </tr>
              <tr>
                <td class="fw-bold">Email</td>
                <td>{{ order.customer.email }}</td>
              </tr>
              <tr>
                <td class="fw-bold">Tổng tiền</td>
                <td>{{ `${formatCash(order.total_money)} VNĐ` }}</td>
              </tr>
              <tr>
                <td class="fw-bold">Trạng thái</td>
                <td v-html="getStatusOrder(order.status)"></td>
              </tr>
            </table>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <DataTable
                :data="order.order_details"
                :columns="columns"
                class="display table table-striped table-bordered table-order"
                :options="{
                  responsive: true,
                  autoWidth: true,
                  dom: 'BRltip',
                  language: {
                    zeroRecords: 'Không có bản ghi nào',
                    info: 'Chi tiết đơn hàng',
                    paginate: {
                      previous: 'Trước',
                      next: 'Sau',
                      first: 'Trang đầu',
                      last: 'Trang cuối',
                    },
                  },
                  buttons: false,
                }"
              >
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá tiền</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá tiền</th>
                  </tr>
                </tfoot>
              </DataTable>
            </div>
          </div>
          <button
            v-if="order.status == 0"
            id="btn-edit"
            class="btn btn-danger btn-rounded"
            @click="emit('changeStatus', 3)"
          >
            Hủy đơn hàng
          </button>
          <button
            v-if="order.status == 2"
            id="btn-edit"
            class="btn btn-success btn-rounded"
            @click="emit('changeStatus', 5)"
          >
            Đã nhận được hàng</button
          >&emsp13;
          <button
            v-if="order.status == 2"
            id="btn-edit"
            class="btn btn-warning btn-rounded"
            @click="emit('changeStatus', 6)"
          >
            Trả hàng
          </button>
          <button
            v-if="order.status == 3"
            id="btn-edit"
            class="btn btn-success btn-rounded"
            @click="emit('changeStatus', 0)"
          >
            Ngừng hủy
          </button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" type="button" data-dismiss="modal">
            Thoát
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  defineEmits,
  defineProps,
} from 'vue';

import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import DataTable from 'datatables.net-vue3';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import {
  formatCash,
  getStatusOrder,
} from '@/helpers/helper';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const props = defineProps({
  order: Object,
});

const emit = defineEmits(["changeStatus"]);

const columns = [
  {
    data: null,
    render: function (data, type, row, meta) {
      return `${meta.row + 1}`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.product_detail.product.name;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `<img class="thumb" style="max-width:100px;max-height:100px" src="${data.product_detail.thumb}" />`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.quantity;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `${formatCash(data.unit_price)} VNĐ`;
    },
  },
];
</script>

<style scoped>
.tbl-info th, .tbl-info td {
  padding: 5px;
}
 </style>
