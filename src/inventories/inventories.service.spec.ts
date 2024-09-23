import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesService } from './application/services/inventories.service';
import { InventoryRepository } from './domain/inventory.repository';
import { CreateInventoryDto } from './application/dtos/create-inventory.dto';
import { Inventory } from './domain/entities/inventory.entity';
import { UpdateInventoryDto } from './application/dtos/update-inventory.dto';

const mockInventoryRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findByPlayerAndItem: jest.fn(),
});

describe('InventoriesService', () => {
  let service: InventoriesService;
  let repository: ReturnType<typeof mockInventoryRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoriesService,
        {
          provide: InventoryRepository,
          useFactory: mockInventoryRepository,
        },
      ],
    }).compile();

    service = module.get<InventoriesService>(InventoriesService);
    repository =
      module.get<ReturnType<typeof mockInventoryRepository>>(
        InventoryRepository,
      );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new inventory', async () => {
      const createInventoryDto: CreateInventoryDto = {
        playerId: 1,
        itemId: 1,
        quantity: 2,
      };

      const mockInventory = new Inventory(
        { id: 1, ...createInventoryDto },
        { id: 1, nickname: 'Player1', gold: 100 },
        { id: 1, name: 'Item1' },
      );
      repository.findByPlayerAndItem.mockResolvedValue(null);
      repository.create.mockResolvedValue(mockInventory);

      const result = await service.create(createInventoryDto);

      expect(result).toEqual(mockInventory);
      expect(repository.findByPlayerAndItem).toHaveBeenCalledWith(
        createInventoryDto.playerId,
        createInventoryDto.itemId,
      );
      expect(repository.create).toHaveBeenCalledWith(createInventoryDto);
    });

    it('should update the quantity if inventory exists', async () => {
      const createInventoryDto: CreateInventoryDto = {
        playerId: 1,
        itemId: 1,
        quantity: 2,
      };

      const existingInventory = new Inventory(
        { id: 1, playerId: 1, itemId: 1, quantity: 5 },
        { id: 1, nickname: 'Player1', gold: 100 },
        { id: 1, name: 'Item1' },
      );

      const updatedInventory = new Inventory(
        { id: 1, playerId: 1, itemId: 1, quantity: 7 },
        { id: 1, nickname: 'Player1', gold: 100 },
        { id: 1, name: 'Item1' },
      );

      repository.findByPlayerAndItem.mockResolvedValue(existingInventory);
      repository.update.mockResolvedValue(updatedInventory);

      const result = await service.create(createInventoryDto);

      expect(result).toEqual(updatedInventory);

      expect(repository.findByPlayerAndItem).toHaveBeenCalledWith(
        createInventoryDto.playerId,
        createInventoryDto.itemId,
      );

      expect(repository.update).toHaveBeenCalledWith(existingInventory.id, {
        playerId: createInventoryDto.playerId,
        itemId: createInventoryDto.itemId,
        quantity: existingInventory.quantity + createInventoryDto.quantity,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of inventories', async () => {
      const mockInventories = [
        new Inventory(
          { id: 1, playerId: 1, itemId: 1, quantity: 2 },
          { id: 1, nickname: 'Player1', gold: 100 },
          { id: 1, name: 'Item1' },
        ),
      ];
      repository.findAll.mockResolvedValue(mockInventories);

      const result = await service.findAll();

      expect(result).toEqual(mockInventories);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an inventory', async () => {
      const mockInventory = new Inventory(
        { id: 1, playerId: 1, itemId: 1, quantity: 2 },
        { id: 1, nickname: 'Player1', gold: 100 },
        { id: 1, name: 'Item1' },
      );
      repository.findById.mockResolvedValue(mockInventory);

      const result = await service.findById(1);

      expect(result).toEqual(mockInventory);
      expect(repository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an inventory', async () => {
      const updateInventoryDto: UpdateInventoryDto = {
        quantity: 3,
      };

      const mockInventory = new Inventory(
        { id: 1, playerId: 1, itemId: 1, quantity: 3 },
        { id: 1, nickname: 'Player1', gold: 100 },
        { id: 1, name: 'Item1' },
      );
      repository.update.mockResolvedValue(mockInventory);

      const result = await service.update(1, updateInventoryDto);

      expect(result).toEqual(mockInventory);
      expect(repository.update).toHaveBeenCalledWith(1, updateInventoryDto);
    });
  });

  describe('delete', () => {
    it('should delete an inventory', async () => {
      const result = await service.delete(1);

      expect(result).toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
