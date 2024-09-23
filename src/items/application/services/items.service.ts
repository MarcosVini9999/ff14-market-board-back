import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dtos/create-item.dto';
import { Item } from 'src/items/domain/entities/item.entity';
import { ItemRepository } from 'src/items/domain/item.repository';
import { UpdateItemDto } from '../dtos/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.create(createItemDto);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }

  async findById(id: number): Promise<Item> {
    return this.itemRepository.findById(id);
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemRepository.update(id, updateItemDto);
  }

  async delete(id: number): Promise<void> {
    return this.itemRepository.delete(id);
  }
}
