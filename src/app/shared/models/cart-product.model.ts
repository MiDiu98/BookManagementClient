export class  CartProduct {
  cartId: number;
  productId: number;
  productName: string;
  productCover: string;
  productDescription: string;
  price: number;
  quantity: number;

  constructor(init?: Partial<CartProduct>) {
    Object.assign(this, init);
  }
}
