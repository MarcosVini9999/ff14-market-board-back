import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [PlayersModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
