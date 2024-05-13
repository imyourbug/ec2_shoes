import {
  createLogger,
  createStore,
} from 'vuex';

import accounts from '@/store/modules/accounts';
import carts from '@/store/modules/carts';
import categories from '@/store/modules/categories';
import comments from '@/store/modules/comments';
import detail_products from '@/store/modules/detail_products';
import orders from '@/store/modules/orders';
import products from '@/store/modules/products';
import shipments from '@/store/modules/shipments';
import slides from '@/store/modules/slides';
import statistics from '@/store/modules/statistics';
import suppliers from '@/store/modules/suppliers';
import vouchers from '@/store/modules/vouchers';

const debug = process.env.NODE_ENV !== "production";

export default createStore({
  modules: {
    products,
    accounts,
    categories,
    suppliers,
    detail_products,
    orders,
    statistics,
    comments,
    vouchers,
    shipments,
    carts,
    slides,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
