import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './presentation/offers.controller';
import { OffersService } from './application/services/offers.service';

describe('OffersController', () => {
  let controller: OffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [OffersService],
    }).compile();

    controller = module.get<OffersController>(OffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
