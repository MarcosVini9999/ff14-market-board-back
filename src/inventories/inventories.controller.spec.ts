import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesService } from './application/services/inventories.service';
import { InventoriesController } from './presentation/inventories.controller';
import { Item, Player } from '@prisma/client';
import { Inventory } from './domain/entities/inventory.entity';
import { CreateInventoryDto } from './application/dtos/create-inventory.dto';
import { UpdateInventoryDto } from './application/dtos/update-inventory.dto';

describe('InventoriesController', () => {
  let controller: InventoriesController;
  let service: InventoriesService;

  const mockPlayer: Player = {
    id: 1,
    nickname: 'Player1',
    gold: 100,
  };

  const mockItem: Item = {
    id: 1,
    name: 'Item1',
  };

  const mockInventory = new Inventory(
    {
      id: 1,
      playerId: 1,
      itemId: 1,
      quantity: 10,
    },
    mockPlayer,
    mockItem,
  );

  const mockInventoriesService = {
    create: jest.fn().mockResolvedValue(mockInventory),
    findAll: jest.fn().mockResolvedValue([mockInventory]),
    findById: jest.fn().mockResolvedValue(mockInventory),
    update: jest.fn().mockResolvedValue(mockInventory),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoriesController],
      providers: [
        {
          provide: InventoriesService,
          useValue: mockInventoriesService,
        },
      ],
    }).compile();

    controller = module.get<InventoriesController>(InventoriesController);
    service = module.get<InventoriesService>(InventoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an inventory', async () => {
      const createInventoryDto: CreateInventoryDto = {
        playerId: 1,
        itemId: 1,
        quantity: 5,
      };

      const result = await controller.create(createInventoryDto);
      expect(result).toEqual(mockInventory);
      expect(service.create).toHaveBeenCalledWith(createInventoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of inventories', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockInventory]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a single inventory', async () => {
      const result = await controller.findById(1);
      expect(result).toEqual(mockInventory);
      expect(service.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an inventory', async () => {
      const updateInventoryDto: UpdateInventoryDto = {
        quantity: 15,
      };

      const result = await controller.update(1, updateInventoryDto);
      expect(result).toEqual(mockInventory);
      expect(service.update).toHaveBeenCalledWith(1, updateInventoryDto);
    });
  });

  describe('delete', () => {
    it('should delete an inventory', async () => {
      await controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
