import { OrderProduct } from './order-product.model';
import { Promotion } from './promotion.model';

export class Order {
  id: number;
  userId: number;
  address: string;
  totalCharges: number;
  status: string;
  shippingFee: number;
  deliver: string;
  orderDate: Date;
  deliveryDate: Date;
  promotions: Array<Promotion>;
  orderProducts: Array<OrderProduct>;
}
