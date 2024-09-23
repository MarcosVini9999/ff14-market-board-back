import { Item as ItemModel } from '@prisma/client';

export class Item {
  id: number;
  name: string;

  constructor(itemModel: ItemModel) {
    this.id = itemModel.id;
    this.name = itemModel.name;
  }
}
