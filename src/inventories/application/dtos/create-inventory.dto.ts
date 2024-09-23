import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsInt()
  @IsNotEmpty()
  playerId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  quantity: number;
}
