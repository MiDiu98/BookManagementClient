export class Question {
  id: number;
  question: string;
  answer: string;
  createAt: Date;
  updateAt: Date;
  userId: number;
  username: string;
  avatar: string;
  productId: number;

  constructor(init?: Partial<Question>) {
    Object.assign(this, init);
  }
}
