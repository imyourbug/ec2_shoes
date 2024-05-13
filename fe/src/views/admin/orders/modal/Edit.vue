<template>
  <div>
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Chi tiết đơn hàng</h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Danh sách sản phẩm
            </h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <DataTable
                :data="data.order_details"
                :columns="columns"
                class="display table table-striped table-bordered table-order"
                :options="{
                  responsive: true,
                  autoWidth: true,
                  dom: 'BRltip',
                  language: {
                    search: 'Tìm kiếm',
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
            v-if="data.status == 0"
            id="btn-edit"
            class="btn btn-success btn-rounded"
            @click="emit('changeStatus', 1)"
          >
            Xác nhận đơn hàng
          </button>
          <button
            v-if="data.status == 1"
            id="btn-edit"
            class="btn btn-success btn-rounded"
            @click="emit('changeStatus', 2)"
          >
            Đã lấy hàng
          </button>
          <button
            v-if="data.status == 3"
            id="btn-edit"
            class="btn btn-danger btn-rounded"
            @click="emit('changeStatus', 4)"
          >
            Xác nhận hủy
          </button>
          <button
            v-if="data.status == 6"
            id="btn-edit"
            class="btn btn-success btn-rounded"
            @click="emit('changeStatus', 7)"
          >
            Đã nhận hàng hoàn
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
  <!-- <button @click="test">test</button> -->
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  defineEmits,
  defineProps,
  ref,
  watch,
} from 'vue';

import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import DataTable from 'datatables.net-vue3';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { formatCash } from '@/helpers/helper';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const props = defineProps({
  data: Object,
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
.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.thumb {
  width: 50px;
  height: 50px;
}
</style>
