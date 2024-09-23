import { Test, TestingModule } from '@nestjs/testing';
import { OfferRepository } from 'src/offers/domain/offer.repository';
import { PlayerRepository } from 'src/players/domain/player.repository';
import { ItemRepository } from 'src/items/domain/item.repository';
import { InventoryRepository } from 'src/inventories/domain/inventory.repository';
import { NotFoundException } from '@nestjs/common';
import { Offer } from 'src/offers/domain/entities/offer.entity';
import { OffersService } from './application/services/offers.service';
import { UpdateOfferdto } from './application/dtos/update-offer.dto';
import { OfferType } from './domain/offer-type.enum';

describe('OffersService', () => {
  let service: OffersService;
  let offerRepository: OfferRepository;
  let playerRepository: PlayerRepository;
  let itemRepository: ItemRepository;
  let inventoryRepository: InventoryRepository;

  const mockOfferRepository = {
    findById: jest.fn(),
    update: jest.fn(),
    findSellOffer: jest.fn(),
    findBuyOffer: jest.fn(),
    delete: jest.fn(),
  };

  const mockPlayerRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const mockItemRepository = {
    findById: jest.fn(),
  };

  const mockInventoryRepository = {
    findByPlayerAndItem: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OffersService,
        { provide: OfferRepository, useValue: mockOfferRepository },
        { provide: PlayerRepository, useValue: mockPlayerRepository },
        { provide: ItemRepository, useValue: mockItemRepository },
        { provide: InventoryRepository, useValue: mockInventoryRepository },
      ],
    }).compile();

    service = module.get<OffersService>(OffersService);
    offerRepository = module.get<OfferRepository>(OfferRepository);
    playerRepository = module.get<PlayerRepository>(PlayerRepository);
    itemRepository = module.get<ItemRepository>(ItemRepository);
    inventoryRepository = module.get<InventoryRepository>(InventoryRepository);
  });

  describe('update', () => {
    it('should throw NotFoundException if offer does not exist', async () => {
      const updateOfferDto: UpdateOfferdto = {
        playerId: 1,
        itemId: 2,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        endsAt: new Date(),
      };

      mockOfferRepository.findById.mockResolvedValue(null);

      await expect(service.update(1, updateOfferDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if player does not exist', async () => {
      const updateOfferDto: UpdateOfferdto = {
        playerId: 1,
        itemId: 2,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        endsAt: new Date(),
      };

      const existingOffer = new Offer({
        id: 1,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        totalValue: 200,
        endsAt: new Date(),
        playerId: 1,
        itemId: 2,
        createdAt: new Date(),
      });

      mockOfferRepository.findById.mockResolvedValue(existingOffer);
      mockPlayerRepository.findById.mockResolvedValue(null);

      await expect(service.update(1, updateOfferDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if item does not exist', async () => {
      const updateOfferDto: UpdateOfferdto = {
        playerId: 1,
        itemId: 2,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        endsAt: new Date(),
      };

      const existingOffer = new Offer({
        id: 1,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        totalValue: 200,
        endsAt: new Date(),
        playerId: 1,
        itemId: 2,
        createdAt: new Date(),
      });

      const player = { id: 1, gold: 500 };

      mockOfferRepository.findById.mockResolvedValue(existingOffer);
      mockPlayerRepository.findById.mockResolvedValue(player);
      mockItemRepository.findById.mockResolvedValue(null);

      await expect(service.update(1, updateOfferDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle purchase if sell offer exists', async () => {
      const updateOfferDto: UpdateOfferdto = {
        playerId: 1,
        itemId: 2,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        endsAt: new Date(),
      };

      const existingOffer = new Offer({
        id: 1,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        totalValue: 200,
        endsAt: new Date(),
        playerId: 1,
        itemId: 2,
        createdAt: new Date(),
      });

      const player = { id: 1, gold: 500 };
      const item = { id: 2 };
      const sellOffer = new Offer({
        id: 3,
        type: 'SELL' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        totalValue: 200,
        endsAt: new Date(),
        playerId: 2,
        itemId: 2,
        createdAt: new Date(),
      });

      mockOfferRepository.findById.mockResolvedValue(existingOffer);
      mockPlayerRepository.findById.mockResolvedValue(player);
      mockItemRepository.findById.mockResolvedValue(item);
      mockOfferRepository.findSellOffer.mockResolvedValue(sellOffer);
      mockInventoryRepository.findByPlayerAndItem.mockResolvedValue(null);
      mockInventoryRepository.create.mockResolvedValue(undefined);
      mockPlayerRepository.update.mockResolvedValue(undefined);
      mockOfferRepository.delete.mockResolvedValue(undefined);

      const result = await service.update(1, updateOfferDto);

      expect(result).toEqual(sellOffer);
    });
  });
});
