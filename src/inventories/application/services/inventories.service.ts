import { Injectable } from '@nestjs/common';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';
import { InventoryRepository } from 'src/inventories/domain/inventory.repository';
import { CreateInventoryDto } from '../dtos/create-inventory.dto';
import { UpdateInventoryDto } from '../dtos/update-inventory.dto';

@Injectable()
export class InventoriesService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async create(inventoryDto: CreateInventoryDto): Promise<Inventory> {
    const existingInventory =
      await this.inventoryRepository.findByPlayerAndItem(
        inventoryDto.playerId,
        inventoryDto.itemId,
      );

    if (existingInventory) {
      const updatedQuantity =
        existingInventory.quantity + inventoryDto.quantity;

      return this.inventoryRepository.update(existingInventory.id, {
        ...inventoryDto,
        quantity: updatedQuantity,
      });
    } else {
      return this.inventoryRepository.create(inventoryDto);
    }
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryRepository.findAll();
  }

  async findById(id: number): Promise<Inventory> {
    return this.inventoryRepository.findById(id);
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoryRepository.update(id, updateInventoryDto);
  }

  async delete(id: number): Promise<void> {
    return this.inventoryRepository.delete(id);
  }
}
