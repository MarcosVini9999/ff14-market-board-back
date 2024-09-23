import { Module } from '@nestjs/common';
import { InventoriesService } from './application/services/inventories.service';
import { InventoriesController } from './presentation/inventories.controller';
import { InventoryRepositoryProvider } from './data/provider';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [InventoriesController],
  providers: [InventoriesService, InventoryRepositoryProvider],
})
export class InventoriesModule {}
