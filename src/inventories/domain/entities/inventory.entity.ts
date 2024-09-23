// src/inventories/domain/entities/inventory.entity.ts

import { Inventory as InventoryModel, Player, Item } from '@prisma/client';

export class Inventory {
  id: number;
  player: Player;
  item: Item;
  quantity: number;

  constructor(inventoryModel: InventoryModel, player: Player, item: Item) {
    this.id = inventoryModel.id;
    this.player = player;
    this.item = item;
    this.quantity = inventoryModel.quantity;
  }
}
