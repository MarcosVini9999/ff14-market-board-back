import { Module } from '@nestjs/common';
import { ItemsController } from './presentation/items.controller';
import { ItemsService } from './application/services/items.service';
import { CoreModule } from 'src/core/core.module';
import { ItemRepositoryProvider } from './data/provider';

@Module({
  imports: [CoreModule],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepositoryProvider],
})
export class ItemsModule {}
