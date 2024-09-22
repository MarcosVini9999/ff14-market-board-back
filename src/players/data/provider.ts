import { Provider } from '@nestjs/common';
import { PlayerRepository } from '../domain/player.repository';
import { PrismaPlayerRepository } from './prisma/prisma-player.repository';

export const PlayerRepositoryProvider: Provider<PlayerRepository> = {
  provide: PlayerRepository,
  useClass: PrismaPlayerRepository,
};
