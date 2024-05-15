import AccountRepository from '@/api/repositories/accounts/AccountRepository';
import AuthRepository from '@/api/repositories/authentications/AuthRepository';
import CategoryRepository
  from '@/api/repositories/categories/CategoryRepository';
import ClientRepository from '@/api/repositories/clients/ClientRepository';
import ColorRepository from '@/api/repositories/colors/ColorRepository';
import CommentRepository from '@/api/repositories/comments/CommentRepository';
import DetailProductRepository
  from '@/api/repositories/detail_products/DetailProductRepository';
import OrderRepository from '@/api/repositories/orders/OrderRepository';
import ProductRepository from '@/api/repositories/products/ProductRepository';
import ProvinceRepository
  from '@/api/repositories/provinces/ProvinceRepository';
import ShipmentRepository
  from '@/api/repositories/shipments/ShipmentRepository';
import SizeRepository from '@/api/repositories/sizes/SizeRepository';
import SlideRepository from '@/api/repositories/sliders/SlideRepository';
import StatisticRepository
  from '@/api/repositories/statistics/StatisticRepository';
import SupplierRepository
  from '@/api/repositories/suppliers/SupplierRepository';
import UploadRepository from '@/api/repositories/uploads/UploadRepository';
import VoucherRepository from '@/api/repositories/vouchers/VoucherRepository';

const repositories = {
  color: ColorRepository,
  account: AccountRepository,
  size: SizeRepository,
  category: CategoryRepository,
  supplier: SupplierRepository,
  product: ProductRepository,
  detail_product: DetailProductRepository,
  client: ClientRepository,
  voucher: VoucherRepository,
  auth: AuthRepository,
  upload: UploadRepository,
  province: ProvinceRepository,
  comment: CommentRepository,
  slide: SlideRepository,
  order: OrderRepository,
  statistic: StatisticRepository,
  shipment: ShipmentRepository,
};

export const RepositoryFactory = {
  get: (name) => repositories[name],
};
