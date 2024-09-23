// src/items/application/services/items.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './application/services/items.service';
import { ItemRepository } from './domain/item.repository';
import { Item } from './domain/entities/item.entity';
import { CreateItemDto } from './application/dtos/create-item.dto';
import { UpdateItemDto } from './application/dtos/update-item.dto';

describe('ItemsService', () => {
  let itemsService: ItemsService;
  let itemRepository: ItemRepository;

  const mockItem: Item = { id: 1, name: 'Sword' }; // Sem inventário nem ofertas

  const mockItemRepository = {
    create: jest.fn((dto: CreateItemDto) => {
      return { id: 1, ...dto };
    }),
    findAll: jest.fn(() => [mockItem]),
    findById: jest.fn((id: number) => {
      return { ...mockItem, id };
    }),
    update: jest.fn((id: number, dto: UpdateItemDto) => {
      return { ...mockItem, ...dto, id };
    }),
    delete: jest.fn((id: number) => {
      return;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: ItemRepository,
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  it('should be defined', () => {
    expect(itemsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createItemDto: CreateItemDto = { name: 'Sword' };
      expect(await itemsService.create(createItemDto)).toEqual({
        id: 1,
        ...createItemDto,
      });
      expect(itemRepository.create).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      expect(await itemsService.findAll()).toEqual([mockItem]);
      expect(itemRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an item by id', async () => {
      expect(await itemsService.findById(1)).toEqual(mockItem);
      expect(itemRepository.findById).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'Updated Sword' };
      expect(await itemsService.update(1, updateItemDto)).toEqual({
        ...mockItem,
        ...updateItemDto,
        id: 1,
      });
      expect(itemRepository.update).toHaveBeenCalledWith(1, updateItemDto);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      await itemsService.delete(1);
      expect(itemRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
