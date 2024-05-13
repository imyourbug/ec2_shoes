<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Nhà cung cấp</h1>
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Danh sách</h6>
        <button
          @click="reset"
          data-target="#modalAdd"
          data-toggle="modal"
          class="btn btn-success btn-add"
        >
          <i class="fa-solid fa-plus"></i>&ensp;Thêm mới
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <DataTable
            :data="suppliers"
            :columns="columns"
            class="display table table-striped table-bordered table-suppliers"
            :options="{
              pageLength: 5,
              responsive: true,
              autoWidth: true,
              dom: 'BRlftip',
              language: {
                search: 'Tìm kiếm',
                zeroRecords: 'Không có bản ghi nào',
                info: 'Danh sách nhà cung cấp',
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
                <th>Tên nhà cung cấp</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Tên nhà cung cấp</th>
                <th>Địa chỉ</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal add -->
  <Create
    class="modal fade"
    id="modalAdd"
    :add="add"
    :rules="rules"
    :supplier="supplier"
    :suppliers="suppliers"
  />

  <!-- Modal edit -->
  <Edit
    class="modal fade"
    id="modalEdit"
    :rules="rules"
    :edit="edit"
    :supplier="supplier"
    :suppliers="suppliers"
  />
  <!-- Modal remove -->
  <Remove class="modal fade" id="modalRemove" :remove="remove" />
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  computed,
  onMounted,
  reactive,
  ref,
} from 'vue';

import DataTablesCore from 'datatables.net';
import DataTableLib from 'datatables.net-bs5';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import DataTable from 'datatables.net-vue3';
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { useStore } from 'vuex';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import Create from '@/views/admin/suppliers/modal/Create.vue';
import Edit from '@/views/admin/suppliers/modal/Edit.vue';
import Remove from '@/views/admin/suppliers/modal/Remove.vue';
import { useToasted } from '@hoppscotch/vue-toasted';
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  helpers,
  required,
} from '@vuelidate/validators';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const toast = useToasted();
const store = useStore();
const supplierRepository = RepositoryFactory.get("supplier");

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
};

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const list_sup_id = ref([]);
const supplier = reactive({
  id: 0,
  name: "",
  address: "",
  email: "",
  phone: "",
});

const suppliers = computed(() => {
  return store.state.suppliers.all;
});

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
      return data.name;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.address;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.email;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.phone;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `<a data-toggle="modal"
        data-id='${JSON.stringify(data)}'
        data-target="#modalEdit"
        class="btn btn-primary btn-option edit-button"
        > <i class="fa-solid fa-pen-to-square edit-button"
        data-id='${JSON.stringify(data)}'></i> </a
        >&emsp; <a class="btn btn-danger btn-option remove-button"
        data-toggle="modal"
        data-target="#modalRemove"
        data-id="${data.id}"
        > <i class="fas fa-trash remove-button"
        data-id="${data.id}"
        ></i> </a>`;
    },
  },
];

const valid_phone = helpers.regex(/^0\d{9}$/);
// validate
const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
  address: { required: helpers.withMessage("Không được để trống!", required) },
  email: {
    required: helpers.withMessage("Không được để trống!", required),
    email: helpers.withMessage("Email không hợp lệ!", email),
  },
  phone: {
    required: helpers.withMessage("Không được để trống!", required),
    valid_phone: helpers.withMessage("Số điện thoại không hợp lệ!", valid_phone),
  },
};

const v$ = useVuelidate(rules, supplier);

const reload = () => {
  store.dispatch("suppliers/getAll");
};

reload();

const add = () => {
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
    $("#btn-add").prop("disabled", true);
    supplierRepository.create(supplier).then((response) => {
      if (response.data.status === 0) {
        $("#btn-add").prop("disabled", false);
        closeModal("modalAdd");
        reload();
        toast.success("Tạo nhà cung cấp thành công", {
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
        $("#btn-add").prop("disabled", false);
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
        $("#btn-add").prop("disabled", false);
        console.log(response);
      }
    });
  }
};

const edit = () => {
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
    $("#btn-edit").prop("disabled", true);
    supplierRepository.edit(supplier).then((response) => {
      if (response.data.status === 0) {
        $("#btn-edit").prop("disabled", false);
        closeModal("modalEdit");
        reload();
        toast.success("Chỉnh sửa nhà cung cấp thành công", {
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
  }
};

const getSupplier = (sup) => {
  supplier.id = sup.id;
  supplier.email = sup.email;
  supplier.name = sup.name;
  supplier.address = sup.address;
  supplier.phone = sup.phone;
};

const remove = () => {
  if (list_sup_id.value.length === 0) {
    toast.error("Bạn cần chọn ít nhất một nhà cung cấp", {
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
    let id = list_sup_id.value[0];
    supplierRepository.remove(id).then((response) => {
      if (response.data.status === 0) {
        $("#btn-remove").prop("disabled", false);
        closeModal("modalRemove");
        reload();
        toast.success("Xóa nhà cung cấp thành công", {
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

const addCateId = (sup_id) => {
  list_sup_id.value = [];
  list_sup_id.value.push(sup_id);
};

const reset = () => {
  supplier.id = 0;
  supplier.email = "";
  supplier.name = "";
  supplier.address = "";
  supplier.phone = "";
};

onMounted(() => {
  const dataTable = $(".table-suppliers");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getSupplier(JSON.parse(target.dataset.id));
    } else if (target.classList.contains("remove-button")) {
      addCateId(target.dataset.id);
    }
  });
});
</script>

<style scoped>
.btn-add {
  float: right;
}
.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
</style>
