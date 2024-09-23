import { CreatePlayerDto } from '../application/dtos/create-player.dto';
import { Player } from './entities/player.entity';

export abstract class PlayerRepository {
  abstract create(data: CreatePlayerDto): Promise<Player>;
  abstract findAll(): Promise<Player[]>;
  abstract findById(id: number): Promise<Player | null>;
  abstract update(id: number, data: CreatePlayerDto): Promise<Player>;
}
