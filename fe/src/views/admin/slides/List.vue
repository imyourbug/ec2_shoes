<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Slide</h1>

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
            :data="slides"
            :columns="columns"
            class="display table table-striped table-bordered table-slides"
            :options="{
              pageLength: 5,
              responsive: true,
              autoWidth: true,
              dom: 'BRlftip',
              language: {
                search: 'Tìm kiếm',
                zeroRecords: 'Không có bản ghi nào',
                info: 'Danh sách slide',
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
                <th>Ảnh</th>
                <th>Trạng thái</th>
                <th>Sắp xếp</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Trạng thái</th>
                <th>Sắp xếp</th>
                <th>Lựa chọn</th>
              </tr>
            </tfoot>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <Create
    class="modal fade"
    id="modalAdd"
    :add="add"
    :uploadImage="uploadImage"
    :rules="rules"
    :slide="slide"
    :slides="slides"
  />
  <Edit
    class="modal fade"
    id="modalEdit"
    :rules="rules"
    :uploadImage="uploadImage"
    :edit="edit"
    :slide="slide"
    :slides="slides"
  />
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
import Create from '@/views/admin/slides/modal/Create.vue';
import Edit from '@/views/admin/slides/modal/Edit.vue';
import Remove from '@/views/admin/slides/modal/Remove.vue';
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
const uploadRepository = RepositoryFactory.get("upload");
const slideRepository = RepositoryFactory.get("slide");

const closeModal = (modal) => {
  $("#" + modal).hide();
  $("body").removeClass("modal-open");
  $(".modal-backdrop").remove();
  v$.value.$reset();
};

const duration_time = process.env.VUE_APP_DURATION_TOAST ?? 3000;
const list_slide_id = ref([]);
const slide = reactive({
  id: "",
  image: "",
  active: 1,
  sort_by: "",
});

const slides = computed(() => {
  console.log(store.state.slides.all);
  return store.state.slides.all;
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
      return `<img style="width: 100%; height: 100px;" src="${data.image}" />`;
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
      return data.sort_by;
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

// v$
const rules = {
  image: { required: helpers.withMessage("Không được để trống!", required) },
  active: { required: helpers.withMessage("Không được để trống!", required) },
  sort_by: {
    required: helpers.withMessage("Không được để trống!", required),
    minValue: helpers.withMessage("Không được để trống!", minValue(0)),
  },
};

const v$ = useVuelidate(rules, slide);

const reload = () => {
  store.dispatch("slides/getAll");
};

reload();

const uploadImage = (event) => {
  let formData = new FormData();
  formData.append("image_file", event.target.files[0]);
  uploadRepository.uploadImage(formData).then((response) => {
    if (response.data.status === 0) {
      slide.image = response.data.url;
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
    slideRepository.create(slide).then((response) => {
      if (response.data.status === 0) {
        $("#btn-add").prop("disabled", false);
        closeModal("modalAdd");
        reload();
        toast.success("Tạo slide thành công", {
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
    slideRepository.edit(slide).then((response) => {
      if (response.data.status === 0) {
        $("#btn-edit").prop("disabled", false);
        closeModal("modalEdit");
        reload();
        toast.success("Chỉnh sửa slide thành công", {
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

const getSlide = (v) => {
  slide.id = v.id;
  slide.sort_by = v.sort_by;
  slide.image = v.image;
  slide.active = v.active;
};

const remove = () => {
  if (list_slide_id.value.length === 0) {
    toast.error("Bạn cần chọn ít nhất một slide", {
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
    let id = list_slide_id.value[0];
    slideRepository.remove(id).then((response) => {
      if (response.data.status === 0) {
        $("#btn-remove").prop("disabled", false);
        closeModal("modalRemove");
        reload();
        toast.success("Xóa slide thành công", {
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

const addSlideId = (slide_id) => {
  list_slide_id.value = [];
  list_slide_id.value.push(slide_id);
};

const reset = () => {
  slide.id = "";
  slide.sort_by = "";
  slide.image = "";
  slide.active = 1;
};

const active = (active) => {
  return active === 0
    ? '<span class="btn btn-danger btn-xs">Không</span>'
    : '<span class="btn btn-success btn-xs">Có</span>';
};

onMounted(() => {
  const dataTable = $(".table-slides");
  dataTable.on("click", (event) => {
    const target = event.target;
    if (target.classList.contains("edit-button")) {
      getSlide(JSON.parse(target.dataset.id));
    } else if (target.classList.contains("remove-button")) {
      addSlideId(target.dataset.id);
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
