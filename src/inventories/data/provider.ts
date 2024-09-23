import { Provider } from '@nestjs/common';
import { InventoryRepository } from '../domain/inventory.repository';
import { PrismaInventoryRepository } from './prisma/prisma-inventory.repository';

export const InventoryRepositoryProvider: Provider<InventoryRepository> = {
  provide: InventoryRepository,
  useClass: PrismaInventoryRepository,
};
