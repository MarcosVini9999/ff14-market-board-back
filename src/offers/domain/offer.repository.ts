import { CreateOfferDto } from '../application/dtos/create-offer.dto';
import { UpdateOfferdto } from '../application/dtos/update-offer.dto';
import { Offer } from './entities/offer.entity';

export abstract class OfferRepository {
  abstract create(createOfferDto: CreateOfferDto): Promise<Offer>;
  abstract findAll(): Promise<Offer[]>;
  abstract findById(id: number): Promise<Offer>;
  abstract update(id: number, updateOfferDto: UpdateOfferdto): Promise<Offer>;
  abstract delete(id: number): Promise<void>;
  abstract findByPlayerAndItem(
    playerId: number,
    itemId: number,
  ): Promise<Offer | null>;
  abstract findSellOffer(
    itemId: number,
    maxPrice: number,
    buyerId: number,
    quantity: number,
  ): Promise<Offer | null>;

  abstract findBuyOffer(
    itemId: number,
    minPrice: number,
    buyerId: number,
    quantity: number,
  ): Promise<Offer | null>;
}
