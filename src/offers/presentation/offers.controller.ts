import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { Offer } from '../domain/entities/offer.entity';
import { CreateOfferDto } from '../application/dtos/create-offer.dto';
import { OffersService } from '../application/services/offers.service';
import { UpdateOfferdto } from '../application/dtos/update-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  @Get()
  async findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Offer> {
    return this.offersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOfferDto: UpdateOfferdto,
  ): Promise<Offer> {
    return this.offersService.update(id, updateOfferDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.offersService.delete(id);
  }
}
