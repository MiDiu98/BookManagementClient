export class Category {
  id: number;
  name: string;
  parentCategoryId: number;

  constructor(init?: Partial<Category>) {
    Object.assign(this, init);
  }
}

export class CategoryCollection {
  parentCate: Category;
  childCate: Category[];

  constructor(init?: Partial<CategoryCollection>) {
    Object.assign(this, init);
  }
}
