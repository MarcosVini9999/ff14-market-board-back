import { Provider } from '@nestjs/common';
import { OfferRepository } from '../domain/offer.repository';
import { PrismaOfferRepository } from './prisma/prisma-offer.repository';

export const OfferRepositoryProvider: Provider<OfferRepository> = {
  provide: OfferRepository,
  useClass: PrismaOfferRepository,
};
