import { OfferType } from '../offer-type.enum';
import { Offer as OfferModel } from '@prisma/client';

export class Offer {
  id: number;
  type: OfferType;
  pricePerUnit: number;
  quantity: number;
  totalValue: number;
  endsAt: Date;
  playerId: number;
  itemId: number;
  createdAt: Date;

  constructor(partial: Partial<OfferModel>) {
    Object.assign(this, partial);
    this.totalValue = this.calculateTotalValue();
  }

  private calculateTotalValue(): number {
    return this.quantity * this.pricePerUnit;
  }
}
