// export default router
import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import Checkout from '@/components/checkouts/PaypalCheckout.vue';
import { getCookie } from '@/helpers/helper.js';
import ListAccount from '@/views/admin/accounts/List.vue';
import ListCategory from '@/views/admin/categories/List.vue';
import AdminHome from '@/views/admin/Home.vue';
import ListOrder from '@/views/admin/orders/List.vue';
import ImportProduct from '@/views/admin/products/import/Index.vue';
import ListProduct from '@/views/admin/products/list/Index.vue';
import ListShipment from '@/views/admin/shipments/List.vue';
import ListSlide from '@/views/admin/slides/List.vue';
import StatisticsRevenue from '@/views/admin/statistics/Revenue.vue';
import ListSupplier from '@/views/admin/suppliers/List.vue';
import ListVoucher from '@/views/admin/vouchers/List.vue';
import Cart from '@/views/client/Cart.vue';
import GroupProduct from '@/views/client/GroupProduct.vue';
import Home from '@/views/client/Home.vue';
import InfoUser from '@/views/client/InfoUser.vue';
import Main from '@/views/client/Main.vue';
import OrderSearch from '@/views/client/OrderSearch.vue';
import ProductDetail from '@/views/client/ProductDetail.vue';
import SearchProduct from '@/views/client/SearchProduct.vue';

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      requiresAuth: false,
      isAdmin: false,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/carts",
        name: "cart",
        component: Cart,
      },
      {
        path: "/user/info",
        name: "info_user",
        component: InfoUser,
        meta: {
          requiresAuth: true,
          isAdmin: false,
        },
      },
      {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
      },
      {
        path: "/products/search/q=:key_word",
        name: "search_product",
        component: SearchProduct,
      },
      {
        path: "/products/detail/:id",
        name: "product_detail",
        component: ProductDetail,
      },
      {
        path: "/categories/:id_category",
        name: "group_product",
        component: GroupProduct,
      },
      {
        path: "/orders/search",
        name: "order_search",
        component: OrderSearch,
      },
    ],
  },
  //
  {
    path: "/admin",
    // name: "admin-home",
    component: AdminHome,
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
    children: [
      {
        path: "home",
        name: "admin-home",
        component: StatisticsRevenue,
      },
      {
        path: "accounts/list",
        name: "list-account",
        component: ListAccount,
      },
      {
        path: "categories/list",
        name: "list-category",
        component: ListCategory,
      },
      {
        path: "suppliers/list",
        name: "list-supplier",
        component: ListSupplier,
      },
      {
        path: "products/list",
        name: "list-product",
        component: ListProduct,
      },
      {
        path: "products/import",
        name: "import-product",
        component: ImportProduct,
      },
      {
        path: "orders/list",
        name: "list-order",
        component: ListOrder,
      },
      {
        path: "statistics/list",
        name: "statistics-revenue",
        component: StatisticsRevenue,
      },
      {
        path: "vouchers/list",
        name: "list-voucher",
        component: ListVoucher,
      },
      {
        path: "shipments/list",
        name: "list-shipment",
        component: ListShipment,
      },
      {
        path: "slides/list",
        name: "list-slide",
        component: ListSlide,
      },
    ],
  },
];

const router = createRouter({ history: createWebHistory(), routes });

// Middleware
router.beforeEach((to, from, next) => {
  const JWT_TOKEN = getCookie("access_token");
  const user = JSON.parse(localStorage.getItem("user"));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user || JWT_TOKEN == null) {
      next("/");
    } else {
      if (to.matched.some((record) => record.meta.isAdmin)) {
        if (user.role == 1) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
