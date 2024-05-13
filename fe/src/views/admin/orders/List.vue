<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Đơn hàng</h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Danh sách</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <DataTable
            :data="orders"
            :columns="columns"
            class="display table table-striped table-bordered table-orders"
            :options="{
              pageLength: 5,
              responsive: true,
              autoWidth: true,
              dom: 'BRlftip',
              language: {
                search: 'Tìm kiếm',
                zeroRecords: 'Không có bản ghi nào',
                info: 'Danh sách đơn hàng',
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
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Khuyến mãi</th>
                <th>Tổng tiền</th>
                <th>Ngày lập</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Khách hàng</th>
                <th>Trạng thái</th>
                <th>Khuyến mãi</th>
                <th>Tổng tiền</th>
                <th>Ngày lập</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal edit -->
  <Edit
    v-if="order"
    class="modal fade"
    id="modalEdit"
    :data="order"
    :status="status"
    @change-status="changeStatus"
  />
  <!-- Modal remove -->
  <Remove class="modal fade" id="modalRemove" :remove="remove" />
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  computed,
  inject,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue';

import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import DataTable from 'datatables.net-vue3';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import {
  convertDateTime,
  formatCash,
} from '@/helpers/helper';
import { getStatusOrder } from '@/helpers/helper.js';
import Edit from '@/views/admin/orders/modal/Edit.vue';
import Remove from '@/views/admin/orders/modal/Remove.vue';
import { useToasted } from '@hoppscotch/vue-toasted';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const toast = useToasted();
const store = useStore();
const router = useRouter();
const emitter = inject("emitter");
const orderRepository = RepositoryFactory.get("order");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const list_order_id = ref([]);

const orders = computed(() => {
  return store.state.orders.all;
});

const order = ref(null);

const status = ref(null);

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
      return data.customer.name;
    },
  },
  {
    data: null,
    className: "dt-body-center",
    render: function (data, type, row, meta) {
      return getStatusOrder(data.status);
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `${data.discount}%`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `${formatCash(data.total_money)} VNĐ`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `${convertDateTime(data.created_at)}`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `<a data-toggle="modal" 
        data-target="#modalEdit" 
        data-id='${JSON.stringify(data)}'
        class="btn btn-primary btn-option edit-button"
        > <i class="fa-solid fa-pen-to-square edit-button" 
        data-id='${JSON.stringify(data)}' ></i> 
        </a>&emsp; <a class="btn btn-danger btn-option remove-button"
        data-toggle="modal" data-target="#modalRemove"
        data-id='${data.id}'
        > <i class="fas fa-trash remove-button" 
        data-id='${data.id}'></i> </a>`;
    },
  },
];

const reload = () => {
  store.dispatch("orders/getAll");
};

reload();

const remove = () => {
  if (list_order_id.value.length === 0) {
    toast.error("Bạn cần chọn ít nhất một đơn hàng", {
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
    $("#btn-remove").prop("disabled", true);
    let id = list_order_id.value[0];
    ordergetAxios().remove(id).then((response) => {
      if (response.data.status === 0) {
        $("#btn-remove").prop("disabled", false);
        closeModal("modalRemove");
        reload();
        toast.success("Xóa đơn hàng thành công", {
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
        $("#btn-remove").prop("disabled", false);
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
        $("#btn-remove").prop("disabled", false);
        console.log(response);
      }
    });
  }
};

const addOrderId = (order_id) => {
  list_order_id.value = [];
  list_order_id.value.push(order_id);
};

const getOrder = (ord) => {
  addOrderId(ord.id);
  order.value = ord;
};

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
};

const changeStatus = (status_order) => {
  status.value = status_order;
  orderRepository
    .edit(list_order_id.value[0], status_order)
    .then((response) => {
      if (response.data.status === 0) {
        $("#btn-edit").prop("disabled", false);
        closeModal("modalEdit");
        reload();
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
        $("#btn-edit").prop("disabled", false);
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
        $("#btn-edit").prop("disabled", false);
        console.log(response);
      }
    });
};

onMounted(() => {
  const dataTable = $(".table-orders");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getOrder(JSON.parse(target.dataset.id));
    } else if (target.classList.contains("remove-button")) {
      addOrderId(target.dataset.id);
    }
  });
});
</script>

<style scoped>
.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
