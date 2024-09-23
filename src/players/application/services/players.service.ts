import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { PlayerRepository } from 'src/players/domain/player.repository';
import { Player } from 'src/players/domain/entities/player.entity';

@Injectable()
export class PlayersService {
  constructor(private readonly playerRepository: PlayerRepository) {}

  async create(data: CreatePlayerDto): Promise<Player> {
    return this.playerRepository.create(data);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }

  async findById(id: number): Promise<Player | null> {
    const player = this.playerRepository.findById(id);

    if (!player) {
      throw new NotFoundException(`Player with ID ${id} not found`);
    }

    return player;
  }
}
