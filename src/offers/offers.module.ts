import { Module } from '@nestjs/common';
import { OffersService } from './application/services/offers.service';
import { OffersController } from './presentation/offers.controller';
import { OfferRepositoryProvider } from './data/provider';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [OffersController],
  providers: [OffersService, OfferRepositoryProvider],
})
export class OffersModule {}
