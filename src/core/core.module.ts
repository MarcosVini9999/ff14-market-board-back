import { Module } from '@nestjs/common';
import { PrismaService } from './data';
import { PlayerRepositoryProvider } from 'src/players/data/provider';
import { ItemRepositoryProvider } from 'src/items/data/provider';
import { InventoryRepositoryProvider } from 'src/inventories/data/provider';

@Module({
  providers: [
    PrismaService,
    PlayerRepositoryProvider,
    ItemRepositoryProvider,
    InventoryRepositoryProvider,
  ],
  exports: [
    PrismaService,
    PlayerRepositoryProvider,
    ItemRepositoryProvider,
    InventoryRepositoryProvider,
  ],
})
export class CoreModule {}
