import { CreateItemDto } from '../application/dtos/create-item.dto';
import { UpdateItemDto } from '../application/dtos/update-item.dto';
import { Item } from './entities/item.entity';

export abstract class ItemRepository {
  abstract create(item: CreateItemDto): Promise<Item>;
  abstract findAll(): Promise<Item[]>;
  abstract findById(id: number): Promise<Item>;
  abstract update(id: number, item: UpdateItemDto): Promise<Item>;
  abstract delete(id: number): Promise<void>;
}
