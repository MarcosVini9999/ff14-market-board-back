import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/data/prisma.service';
import { CreateInventoryDto } from 'src/inventories/application/dtos/create-inventory.dto';
import { InventoryRepository } from 'src/inventories/domain/inventory.repository';
import { Inventory } from 'src/inventories/domain/entities/inventory.entity';
import { UpdateInventoryDto } from 'src/inventories/application/dtos/update-inventory.dto';

@Injectable()
export class PrismaInventoryRepository extends InventoryRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(inventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventoryModel = await this.prisma.inventory.create({
      data: inventoryDto,
    });

    const player = await this.prisma.player.findUnique({
      where: { id: inventoryDto.playerId },
    });

    const item = await this.prisma.item.findUnique({
      where: { id: inventoryDto.itemId },
    });

    return new Inventory(inventoryModel, player, item);
  }

  async findAll(): Promise<Inventory[]> {
    const inventories = await this.prisma.inventory.findMany({
      include: {
        player: true,
        item: true,
      },
    });

    return inventories.map((inv) => new Inventory(inv, inv.player, inv.item));
  }

  async findById(id: number): Promise<Inventory> {
    const inventoryModel = await this.prisma.inventory.findUnique({
      where: { id },
      include: {
        player: true,
        item: true,
      },
    });

    if (!inventoryModel) {
      throw new Error('Inventory not found');
    }

    return new Inventory(
      inventoryModel,
      inventoryModel.player,
      inventoryModel.item,
    );
  }

  async update(
    id: number,
    inventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventoryModel = await this.prisma.inventory.update({
      where: { id },
      data: inventoryDto,
    });

    const player = await this.prisma.player.findUnique({
      where: { id: inventoryModel.playerId },
    });

    const item = await this.prisma.item.findUnique({
      where: { id: inventoryModel.itemId },
    });

    return new Inventory(inventoryModel, player, item);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.inventory.delete({ where: { id } });
  }

  async findByPlayerAndItem(
    playerId: number,
    itemId: number,
  ): Promise<Inventory | null> {
    const existingInventory = await this.prisma.inventory.findFirst({
      where: {
        playerId: playerId,
        itemId: itemId,
      },
    });

    if (!existingInventory) {
      return null;
    }

    const player = await this.prisma.player.findUnique({
      where: { id: playerId },
    });

    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
    });

    return new Inventory(existingInventory, player, item);
  }
}
