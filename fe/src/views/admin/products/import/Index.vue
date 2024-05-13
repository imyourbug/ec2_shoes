<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh sách chi tiết sản phẩm</h1>
    <div class="row">
      <div class="col-lg-3">
        <label>Tìm theo tên sản phẩm</label
        ><Select2
          class="select2"
          :options="products_select2"
          :settings="{ settingOption: value, settingOption: value }"
          @select="selectProduct($event)"
        />
        <h4>{{ value }}</h4>
      </div>
    </div>
    <!-- List in stock -->
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Danh sách</h6>
        <button
          @click="reset"
          class="btn btn-success btn-add"
          data-toggle="modal"
          data-target="#modalAdd"
        >
          <i class="fa-solid fa-plus"></i>&ensp;Thêm mới
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <DataTable
            :data="details"
            :columns="columns"
            class="display table table-striped table-bordered table-details"
            :options="{
              pageLength: 5,
              responsive: true,
              autoWidth: true,
              dom: 'BRlftip',
              language: {
                search: 'Tìm kiếm',
                zeroRecords: 'Không có bản ghi nào',
                info: 'Danh sách chi tiết sản phẩm',
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
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng trong kho</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Màu</th>
                <th>Size</th>
                <th>Số lượng trong kho</th>
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
    :detail_product="detail_product"
    :rules="rules"
    :products="products"
    :add="add"
    :uploadImage="uploadImage"
  />
  <!-- Modal edit -->
  <Edit
    :detail_product="detail_product"
    :rules="rules"
    :products="products"
    :edit="edit"
    :uploadImage="uploadImage"
  />
  <!-- Modal remove -->
  <Remove :detail_product="detail_product" :remove="remove" />
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  computed,
  inject,
  onMounted,
  reactive,
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
import Create from '@/views/admin/products/import/modal/Create.vue';
import Edit from '@/views/admin/products/import/modal/Edit.vue';
import Remove from '@/views/admin/products/import/modal/Remove.vue';
import { useToasted } from '@hoppscotch/vue-toasted';
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  minValue,
  required,
} from '@vuelidate/validators';

pdfmake.vfs = pdfFonts.pdfMake.vfs;
DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const toast = useToasted();
const store = useStore();
const router = useRouter();
const emitter = inject("emitter");
const detailRepository = RepositoryFactory.get("detail_product");
const categoryRepository = RepositoryFactory.get("category");
const supplierRepository = RepositoryFactory.get("supplier");
const uploadRepository = RepositoryFactory.get("upload");

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

const details = computed(() => {
  return store.state.detail_products.details;
});
const products = computed(() => {
  return store.state.products.all;
});
const products_select2 = computed(() => {
  let _products = [{ id: 0, text: "Tất cả" }];
  store.state.products.all.forEach((item) => {
    _products.push({
      id: item.id,
      text: item.name,
    });
  });
  return _products;
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
      return data.product.name;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return `<img style="width: 100px; height: 100px;" src="${data.thumb}" />`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return showColor(data.code_color);
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.code_size;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.unit_in_stock;
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

const detail_product = reactive({
  id: "",
  product_id: "",
  size: "",
  color: "",
  quantity: "",
  thumb: "",
});

// validate
const rules = {
  size: { required: helpers.withMessage("Không được để trống!", required) },
  color: { required: helpers.withMessage("Không được để trống!", required) },
  thumb: { required: helpers.withMessage("Không được để trống!", required) },
  quantity: {
    required: helpers.withMessage("Không được để trống!", required),
    minValue: helpers.withMessage("Số lượng nhập phải lớn hơn 0!", minValue(1)),
  },
};

const v$ = useVuelidate(rules, detail_product);

const reload = () => {
  store.dispatch("detail_products/getAll");
  store.dispatch("products/getAll");
  v$.value.$reset();
};

reload();

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
};

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
    detailRepository.create(detail_product).then((response) => {
      if (response.data.status === 0) {
        $("#btn-add").prop("disabled", false);
        closeModal("modalAdd");
        reload();
        toast.success("Thêm thành công", {
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
    detailRepository.edit(detail_product).then((response) => {
      if (response.data.status === 0) {
        $("#btn-edit").prop("disabled", false);
        closeModal("modalEdit");
        reload();
        toast.success("Chỉnh sửa sản phẩm thành công", {
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

const getDetailProduct = (detail) => {
  detail_product.id = detail.id;
  detail_product.product_id = detail.product_id;
  detail_product.size = detail.code_size;
  detail_product.color = detail.code_color;
  detail_product.quantity = detail.unit_in_stock;
  detail_product.thumb = detail.thumb;
  console.log(detail_product);
};

const remove = () => {
  $("#btn-remove").prop("disabled", true);
  detailRepository.remove(detail_product.id).then((response) => {
    if (response.data.status === 0) {
      $("#btn-remove").prop("disabled", false);
      closeModal("modalRemove");
      reload();
      toast.success("Xóa sản phẩm thành công", {
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
};

const addDetailId = (detail_id) => {
  detail_product.id = detail_id;
};

const uploadImage = (event) => {
  let formData = new FormData();
  formData.append("image_file", event.target.files[0]);
  uploadRepository.uploadImage(formData).then((response) => {
    if (response.data.status === 0) {
      detail_product.thumb = response.data.url;
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

const reset = () => {
  detail_product.id = "";
  detail_product.product_id = "";
  detail_product.size = "";
  detail_product.color = "";
  detail_product.unit_in_stock = "";
  detail_product.unit_import = "";
  detail_product.thumb = "";
  v$.value.$reset();
};

const showColor = (code_color) => {
  return `<span class="btn btn-xs" style="background-color:${code_color};height: 40px;
  width: 40px;"></span>`;
};

const selectProduct = (product) => {
  store.dispatch("detail_products/getByProductId", product.id);
};

onMounted(() => {
  const dataTable = $(".table-details");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getDetailProduct(JSON.parse(target.dataset.id));
    } else if (target.classList.contains("remove-button")) {
      addDetailId(target.dataset.id);
    }
  });
});
</script>

<style scoped>
.btn-option {
  border-radius: 50%;
  padding: 5px 10px;
  color: white;
}
.btn-option:hover {
  color: white !important;
}
.btn-add {
  float: right;
}
.card-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.error-msg {
  color: #ed1a29;
  font-size: 14px;
  align-items: center;
}
.thumb {
  width: 50px;
  height: 50px;
}
.delete-all {
  margin-left: 25px;
  color: #ed1a29;
}
.delete-all:hover {
  cursor: pointer;
}
.select-all {
  margin-left: 15px;
}
</style>
