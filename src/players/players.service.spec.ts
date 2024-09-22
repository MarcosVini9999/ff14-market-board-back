import { Test, TestingModule } from '@nestjs/testing';
import { PlayerRepository } from './domain/player.repository';
import { PlayersService } from './application/services/players.service';
import { Player } from './domain/entities/player.entity';

describe('PlayersService', () => {
  let service: PlayersService;
  let playerRepository: PlayerRepository;

  const mockPlayerRepository = {
    create: jest
      .fn()
      .mockImplementation((player: Player) =>
        Promise.resolve({ id: 1, ...player }),
      ),
    findAll: jest.fn().mockResolvedValue([]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: PlayerRepository,
          useValue: mockPlayerRepository,
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playerRepository = module.get<PlayerRepository>(PlayerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a player', async () => {
    const playerData = { nickname: 'John Doe', gold: 1500 };
    const result = await service.create(playerData);
    expect(result).toEqual({ id: 1, ...playerData });
    expect(playerRepository.create).toHaveBeenCalledWith(playerData);
  });

  it('should return all players', async () => {
    const players = await service.findAll();
    expect(players).toEqual([]);
    expect(playerRepository.findAll).toHaveBeenCalled();
  });
});
