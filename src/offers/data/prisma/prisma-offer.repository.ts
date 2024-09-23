import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/data/prisma.service';
import { OfferRepository } from '../../domain/offer.repository';
import { Offer } from '../../domain/entities/offer.entity';
import { CreateOfferDto } from 'src/offers/application/dtos/create-offer.dto';
import { UpdateOfferdto } from 'src/offers/application/dtos/update-offer.dto';
import { OfferType } from '@prisma/client';

@Injectable()
export class PrismaOfferRepository extends OfferRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offerModel = await this.prisma.offer.create({
      data: createOfferDto,
    });

    return new Offer(offerModel);
  }

  async findAll(): Promise<Offer[]> {
    const offers = await this.prisma.offer.findMany();
    return offers.map((offerModel) => new Offer(offerModel));
  }

  async findById(id: number): Promise<Offer> {
    const offerModel = await this.prisma.offer.findUnique({ where: { id } });
    if (!offerModel) {
      throw new Error('Offer not found');
    }
    return new Offer(offerModel);
  }

  async update(id: number, updateOfferDto: UpdateOfferdto): Promise<Offer> {
    const offerModel = await this.prisma.offer.update({
      where: { id },
      data: updateOfferDto,
    });
    return new Offer(offerModel);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.offer.delete({ where: { id } });
  }

  async findByPlayerAndItem(
    playerId: number,
    itemId: number,
  ): Promise<Offer | null> {
    const existingOffer = await this.prisma.offer.findFirst({
      where: { playerId, itemId },
    });

    return existingOffer ? new Offer(existingOffer) : null;
  }

  async findSellOffer(
    itemId: number,
    maxPrice: number,
    buyerId: number,
    quantity: number,
  ): Promise<Offer | null> {
    const offerModel = await this.prisma.offer.findFirst({
      where: {
        itemId,
        type: 'SELL',
        pricePerUnit: {
          lte: maxPrice,
        },
        playerId: {
          not: buyerId,
        },
        quantity: {
          gte: quantity,
        },
      },
    });

    return offerModel
      ? new Offer({
          ...offerModel,
          type: offerModel.type as OfferType,
        })
      : null;
  }

  async findBuyOffer(
    itemId: number,
    minPrice: number,
    buyerId: number,
    quantity: number,
  ): Promise<Offer | null> {
    const offerModel = await this.prisma.offer.findFirst({
      where: {
        itemId,
        type: 'BUY',
        pricePerUnit: {
          gte: minPrice,
        },
        playerId: {
          not: buyerId,
        },
        quantity: {
          gte: quantity,
        },
      },
    });

    return offerModel
      ? new Offer({
          ...offerModel,
          type: offerModel.type as OfferType,
        })
      : null;
  }
}
