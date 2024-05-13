<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Danh mục sản phẩm</h1>

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
            :data="categories"
            :columns="columns"
            class="display table table-striped table-bordered table-categories"
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
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Viết tắt</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Viết tắt</th>
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
    :category="category"
    :categories="categories"
  />

  <!-- Modal edit -->
  <Edit
    class="modal fade"
    id="modalEdit"
    :rules="rules"
    :edit="edit"
    :category="category"
    :categories="categories"
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
import Create from '@/views/admin/categories/modal/Create.vue';
import Edit from '@/views/admin/categories/modal/Edit.vue';
import Remove from '@/views/admin/categories/modal/Remove.vue';
import { useToasted } from '@hoppscotch/vue-toasted';
import { useVuelidate } from '@vuelidate/core';
import {
  helpers,
  required,
} from '@vuelidate/validators';

pdfmake.vfs = pdfFonts.pdfMake.vfs;

DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);
DataTable.use(ButtonsHtml5);

const toast = useToasted();
const store = useStore();
const categoryRepository = RepositoryFactory.get("category");

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
};

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const list_cate_id = ref([]);
const category = reactive({
  id: 0,
  parent_id: 0,
  name: "",
  active: 1,
  description: "",
});

const categories = computed(() => {
  return store.state.categories.all;
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
      return data.description;
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
      return data.slug;
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

// validate
const rules = {
  name: { required: helpers.withMessage("Không được để trống!", required) },
};

const v$ = useVuelidate(rules, category);

const reload = () => {
  store.dispatch("categories/getAll");
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
    categoryRepository.create(category).then((response) => {
      if (response.data.status === 0) {
        $("#btn-add").prop("disabled", false);
        closeModal("modalAdd");
        reload();
        toast.success("Tạo danh mục thành công", {
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
    categoryRepository.edit(category).then((response) => {
      if (response.data.status === 0) {
        $("#btn-edit").prop("disabled", false);
        closeModal("modalEdit");
        reload();
        toast.success("Chỉnh sửa danh mục thành công", {
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

const getCategory = (cate) => {
  category.id = cate.id;
  category.parent_id = cate.parent_id;
  category.name = cate.name;
  category.active = cate.active;
  category.description = cate.description;
};

const remove = () => {
  if (list_cate_id.value.length === 0) {
    toast.error("Bạn cần chọn ít nhất một danh mục", {
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
    let id = list_cate_id.value[0];
    categoryRepository.remove(id).then((response) => {
      if (response.data.status === 0) {
        $("#btn-remove").prop("disabled", false);
        closeModal("modalRemove");
        reload();
        toast.success("Xóa danh mục thành công", {
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

const addCateId = (category_id) => {
  list_cate_id.value = [];
  list_cate_id.value.push(category_id);
};

const reset = () => {
  category.id = 0;
  category.parent_id = 0;
  category.name = "";
  category.active = 1;
  category.description = "";
};

const active = (active) => {
  return active === 1
    ? '<span class="btn btn-danger btn-xs">Không</span>'
    : '<span class="btn btn-success btn-xs">Có</span>';
};

onMounted(() => {
  const dataTable = $(".table-categories");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getCategory(JSON.parse(target.dataset.id));
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
