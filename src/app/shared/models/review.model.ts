export class Review {
  id: number;
  content: string;
  rating: string;
  createAt: Date;
  updateAt: Date;
  userId: number;
  username: string;
  avatar: string;
  productId: number;

  constructor(init?: Partial<Review>) {
    Object.assign(this, init);
  }
}
