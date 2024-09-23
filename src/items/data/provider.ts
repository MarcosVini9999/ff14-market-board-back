import { Provider } from '@nestjs/common';
import { ItemRepository } from '../domain/item.repository';
import { PrismaItemRepository } from './prisma/prisma-item.repository';

export const ItemRepositoryProvider: Provider<ItemRepository> = {
  provide: ItemRepository,
  useClass: PrismaItemRepository,
};
