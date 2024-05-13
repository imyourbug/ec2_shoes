<template>
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <router-link
      class="sidebar-brand d-flex align-items-center justify-content-center"
      :to="{ name: 'home' }"
    >
      <img class="logo" src="@/assets/logo.png" />
    </router-link>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <router-link class="nav-link" :to="{ name: 'admin-home' }">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Trang chủ</span></router-link
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->
    <div class="sidebar-heading">Quản lý</div>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#accounts"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Tài khoản</span>
      </a>
      <div
        id="accounts"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-account' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#categories"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Danh mục sản phẩm</span>
      </a>
      <div
        id="categories"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-category' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#suppliers"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Nhà cung cấp</span>
      </a>
      <div
        id="suppliers"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-supplier' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        data-toggle="collapse"
        data-target="#products"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-fw fa-cog"></i>
        <span>Sản phẩm</span>
      </a>
      <div
        id="products"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-product' }"
            >Danh sách</router-link
          >
        </div>
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'import-product' }"
            >Nhập hàng</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#orders"
        aria-expanded="true"
        aria-controls="orders"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Đơn hàng</span>
      </a>
      <div
        id="orders"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-order' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#vouchers"
        aria-expanded="true"
        aria-controls="vouchers"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Khuyến mãi</span>
      </a>
      <div
        id="vouchers"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-voucher' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#shipments"
        aria-expanded="true"
        aria-controls="shipments"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Vận chuyển</span>
      </a>
      <div
        id="shipments"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-shipment' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <hr class="sidebar-divider" />

    <div class="sidebar-heading">Thống kê</div>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#statistics"
        aria-expanded="true"
        aria-controls="statistics"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Thống kê</span>
      </a>
      <div
        id="statistics"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link
            class="collapse-item"
            :to="{ name: 'statistics-revenue' }"
            >Doanh thu</router-link
          >
        </div>
      </div>
    </li>
    <hr class="sidebar-divider d-none d-md-block" />
    <div class="sidebar-heading">Cài đặt</div>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#slides"
        aria-expanded="true"
        aria-controls="slides"
      >
        <i class="fas fa-fw fa-folder"></i>
        <span>Slide</span>
      </a>
      <div
        id="slides"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link class="collapse-item" :to="{ name: 'list-slide' }"
            >Danh sách</router-link
          >
        </div>
      </div>
    </li>
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
</template>

<script setup></script>

<style scoped>
.logo {
  width: 100%;
  max-height: 60px;
}
.collapsed {
  cursor: pointer;
}
</style>
