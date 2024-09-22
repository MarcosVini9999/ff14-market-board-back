import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsInt()
  @Min(0)
  gold: number;
}
