import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OffersService } from './application/services/offers.service';
import { OffersController } from './presentation/offers.controller';
import { CreateOfferDto } from './application/dtos/create-offer.dto';
import { Offer } from './domain/entities/offer.entity';
import { OfferType } from './domain/offer-type.enum';
import { UpdateOfferdto } from './application/dtos/update-offer.dto';

describe('OffersController', () => {
  let controller: OffersController;
  let offersService: OffersService;

  const mockOffersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [{ provide: OffersService, useValue: mockOffersService }],
    }).compile();

    controller = module.get<OffersController>(OffersController);
    offersService = module.get<OffersService>(OffersService);
  });

  describe('create', () => {
    it('should create an offer', async () => {
      const createOfferDto: CreateOfferDto = {
        playerId: 1,
        itemId: 2,
        type: 'BUY' as OfferType,
        pricePerUnit: 100,
        quantity: 2,
        endsAt: new Date(),
      };

      const newOffer = new Offer({
        id: 1,
        ...createOfferDto,
        totalValue: 200,
        createdAt: new Date(),
      });

      mockOffersService.create.mockResolvedValue(newOffer);

      const result = await controller.create(createOfferDto);
      expect(result).toEqual(newOffer);
      expect(mockOffersService.create).toHaveBeenCalledWith(createOfferDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of offers', async () => {
      const offerArray = [
        new Offer({
          id: 1,
          playerId: 1,
          itemId: 2,
          type: 'BUY',
          pricePerUnit: 100,
          quantity: 2,
          totalValue: 200,
          createdAt: new Date(),
        }),
      ];

      mockOffersService.findAll.mockResolvedValue(offerArray);

      const result = await controller.findAll();
      expect(result).toEqual(offerArray);
      expect(mockOffersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an offer by ID', async () => {
      const existingOffer = new Offer({
        id: 1,
        playerId: 1,
        itemId: 2,
        type: 'BUY',
        pricePerUnit: 100,
        quantity: 2,
        totalValue: 200,
        createdAt: new Date(),
      });

      mockOffersService.findById.mockResolvedValue(existingOffer);

      const result = await controller.findById(1);
      expect(result).toEqual(existingOffer);
      expect(mockOffersService.findById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if offer does not exist', async () => {
      mockOffersService.findById.mockRejectedValue(
        new NotFoundException('Offer not found'),
      );

      await expect(controller.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing offer', async () => {
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
        ...updateOfferDto,
        totalValue: 200,
        createdAt: new Date(),
      });

      mockOffersService.update.mockResolvedValue(existingOffer);

      const result = await controller.update(1, updateOfferDto);
      expect(result).toEqual(existingOffer);
      expect(mockOffersService.update).toHaveBeenCalledWith(1, updateOfferDto);
    });
  });

  describe('delete', () => {
    it('should delete an offer', async () => {
      await controller.delete(1);
      expect(mockOffersService.delete).toHaveBeenCalledWith(1);
    });
  });
});
