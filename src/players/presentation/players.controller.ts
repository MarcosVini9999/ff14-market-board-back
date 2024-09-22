import { Controller, Post, Body, Get } from '@nestjs/common';
import { PlayersService } from '../application/services/players.service';
import { CreatePlayerDto } from '../application/dtos/create-player.dto';
import { Player } from '../domain/entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }
}
