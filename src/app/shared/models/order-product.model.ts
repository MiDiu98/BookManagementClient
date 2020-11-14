export class OrderProduct {
  orderId: number;
  productId: number;
  product: string;
  price: number;
  quantity: number;

  constructor(init?: Partial<OrderProduct>) {
    Object.assign(this, init);
  }
}
