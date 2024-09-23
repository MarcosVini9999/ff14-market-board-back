import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { CoreModule } from './core/core.module';
import { ItemsModule } from './items/items.module';
import { InventoriesModule } from './inventories/inventories.module';

@Module({
  imports: [PlayersModule, CoreModule, ItemsModule, InventoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
