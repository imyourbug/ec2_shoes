<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>
    <!-- DataTales Example -->
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
            :data="products"
            :columns="columns"
            class="display table table-striped table-bordered table-products"
            :options="{
              pageLength: 5,
              responsive: true,
              autoWidth: true,
              dom: 'BRlftip',
              language: {
                search: 'Tìm kiếm',
                zeroRecords: 'Không có bản ghi nào',
                info: 'Danh sách danh mục',
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
                <th>Đã bán</th>
                <th>Giá gốc</th>
                <th>Giá khuyến mãi</th>
                <th>Danh mục</th>
                <th>Nhà cung cấp</th>
                <th>Kích hoạt</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Đã bán</th>
                <th>Giá gốc</th>
                <th>Giá khuyến mãi</th>
                <th>Danh mục</th>
                <th>Nhà cung cấp</th>
                <th>Kích hoạt</th>
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
    :product="product"
    :suppliers="suppliers"
    :categories="categories"
    :rules="rules"
    :add="add"
    :uploadImage="uploadImage"
  />
  <!-- Modal edit -->
  <Edit
    class="modal fade"
    id="modalEdit"
    :product="product"
    :suppliers="suppliers"
    :categories="categories"
    :rules="rules"
    :edit="edit"
    :uploadImage="uploadImage"
  />
  <!-- Modal remove -->
  <Remove
    class="modal fade"
    id="modalRemove"
    :product="product"
    :remove="remove"
  />
</template>

<script setup>
import 'datatables.net-responsive-bs5';

import {
  computed,
  inject,
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
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { RepositoryFactory } from '@/api/repositories/RepositoryFactory.js';
import { formatCash } from '@/helpers/helper';
import Create from '@/views/admin/products/list/modal/Create.vue';
import Edit from '@/views/admin/products/list/modal/Edit.vue';
import Remove from '@/views/admin/products/list/modal/Remove.vue';
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
const productRepository = RepositoryFactory.get("product");
const uploadRepository = RepositoryFactory.get("upload");
const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;

const categories = computed(() => {
  return store.state.categories.all;
});

const suppliers = computed(() => {
  return store.state.suppliers.all;
});

const products = computed(() => {
  return store.state.products.products;
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
      return `<img style="width: 100px; height: 100px;" src="${data.thumb}" />`;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.sold;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return showPrice(data.price);
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return showPrice(data.price_sale);
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.category.name;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return data.supplier.name;
    },
  },
  {
    data: null,
    render: function (data, type, row, meta) {
      return active(data.active);
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

const product = reactive({
  id: 0,
  category_id: 0,
  supplier_id: 0,
  price: 0,
  price_sale: 0,
  name: "",
  active: 1,
  thumb: "",
});

// validate
const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
  price: {
    required: helpers.withMessage("Không được để trống!", required),
    minValue: helpers.withMessage("Giá sản phẩm phải lớn hơn 0!", minValue(1)),
  },
  thumb: { required: helpers.withMessage("Không được để trống!", required) },
};

const v$ = useVuelidate(rules, product);

const reload = () => {
  store.dispatch("categories/getAll");
  store.dispatch("suppliers/getAll");
  store.dispatch("products/getAll");
};

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
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
    productRepository.create(product).then((response) => {
      console.log(response);
      if (response.data.status === 0) {
        $("#btn-add").prop("disabled", false);
        closeModal("modalAdd");
        reload();
        toast.success("Thêm sản phẩm thành công", {
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
    productRepository.edit(product).then((response) => {
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
    });
  }
};

const getProduct = (pro) => {
  product.id = pro.id;
  product.category_id = pro.category_id;
  product.supplier_id = pro.supplier_id;
  product.price = pro.price;
  product.price_sale = pro.price_sale;
  product.name = pro.name;
  product.active = pro.active;
  product.thumb = pro.thumb;
};

const remove = () => {
  if (product.id === 0) {
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
    $("#btn-remove").prop("disabled", true);
    productRepository.remove(product.id).then((response) => {
      if (response.data.status === 0) {
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
        $("#btn-remove").prop("disabled", false);
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

const addProductId = (product_id) => {
  product.id = product_id;
};

const uploadImage = (event) => {
  let formData = new FormData();
  formData.append("image_file", event.target.files[0]);
  uploadRepository.uploadImage(formData).then((response) => {
    if (response.data.status === 0) {
      product.thumb = response.data.url;
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
  });
};

const reset = () => {
  product.id = 0;
  product.name = "";
  product.category_id = 0;
  product.supplier_id = 0;
  product.price = 0;
  product.price_sale = 0;
  product.active = 1;
  product.thumb = "";
  v$.value.$reset();
};

const active = (active) => {
  return active === 1
    ? '<span class="btn btn-success btn-xs">Có</span>'
    : '<span class="btn btn-danger btn-xs">Không</span>';
};

const showPrice = (price) => {
  if (!price) return `Không`;
  return `${formatCash(price)} VNĐ`;
};

onMounted(() => {
  const dataTable = $(".table-products");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getProduct(JSON.parse(target.dataset.id));
    } else if (target.classList.contains("remove-button")) {
      addProductId(target.dataset.id);
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
