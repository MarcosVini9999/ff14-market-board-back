import { CreateInventoryDto } from '../application/dtos/create-inventory.dto';
import { UpdateInventoryDto } from '../application/dtos/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

export abstract class InventoryRepository {
  abstract create(inventory: CreateInventoryDto): Promise<Inventory>;
  abstract findAll(): Promise<Inventory[]>;
  abstract findById(id: number): Promise<Inventory>;
  abstract update(
    id: number,
    inventory: UpdateInventoryDto,
  ): Promise<Inventory>;
  abstract delete(id: number): Promise<void>;
  abstract findByPlayerAndItem(
    playerId: number,
    itemId: number,
  ): Promise<Inventory | null>;
}
