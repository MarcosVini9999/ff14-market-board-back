import { IsEnum, IsInt, IsPositive, IsDate, IsNotEmpty } from 'class-validator';
import { OfferType } from 'src/offers/domain/offer-type.enum';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @IsEnum(OfferType)
  @IsNotEmpty()
  type: OfferType;

  @IsInt()
  @IsPositive()
  pricePerUnit: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsInt()
  @IsPositive()
  playerId: number;

  @IsInt()
  @IsPositive()
  itemId: number;

  @IsDate()
  @Type(() => Date)
  endsAt: Date;
}
