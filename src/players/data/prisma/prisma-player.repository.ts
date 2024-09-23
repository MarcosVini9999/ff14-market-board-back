import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/data';
import { CreatePlayerDto } from 'src/players/application/dtos/create-player.dto';
import { Player } from 'src/players/domain/entities/player.entity';
import { PlayerRepository } from 'src/players/domain/player.repository';

@Injectable()
export class PrismaPlayerRepository extends PlayerRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: CreatePlayerDto): Promise<Player> {
    const playerData = await this.prisma.player.create({ data });
    return new Player(playerData);
  }

  async findAll(): Promise<Player[]> {
    const playersData = await this.prisma.player.findMany();
    return playersData.map((player) => new Player(player));
  }

  async findById(id: number): Promise<Player | null> {
    return this.prisma.player.findUnique({ where: { id } });
  }

  async update(id: number, data: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.update({ where: { id }, data });
  }
}
