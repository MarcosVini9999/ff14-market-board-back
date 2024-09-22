import { Module } from '@nestjs/common';
import { PlayersService } from './application/services/players.service';
import { PlayersController } from './presentation/players.controller';
import { PlayerRepositoryProvider } from './data/provider';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [PlayersController],
  providers: [PlayersService, PlayerRepositoryProvider],
})
export class PlayersModule {}
