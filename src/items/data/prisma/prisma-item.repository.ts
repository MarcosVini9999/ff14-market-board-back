import { Injectable } from '@nestjs/common';
import { Item as ItemModel } from '@prisma/client';
import { PrismaService } from 'src/core/data';
import { CreateItemDto } from 'src/items/application/dtos/create-item.dto';
import { UpdateItemDto } from 'src/items/application/dtos/update-item.dto';
import { Item } from 'src/items/domain/entities/item.entity';
import { ItemRepository } from 'src/items/domain/item.repository';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(itemDto: CreateItemDto): Promise<Item> {
    const itemModel: ItemModel = await this.prisma.item.create({
      data: {
        name: itemDto.name,
      },
    });
    return new Item(itemModel);
  }

  async findAll(): Promise<Item[]> {
    const items: ItemModel[] = await this.prisma.item.findMany();
    return items.map((itemModel) => new Item(itemModel));
  }

  async findById(id: number): Promise<Item> {
    const itemModel: ItemModel = await this.prisma.item.findUnique({
      where: {
        id,
      },
    });
    return new Item(itemModel);
  }

  async update(id: number, itemDto: UpdateItemDto): Promise<Item> {
    const itemModel: ItemModel = await this.prisma.item.update({
      where: { id },
      data: {
        name: itemDto.name,
      },
    });
    return new Item(itemModel);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.item.delete({
      where: { id },
    });
  }
}
