import { Player as PlayerModel } from '@prisma/client';

export class Player {
  id: number;
  nickname: string;
  gold: number;

  constructor(data: PlayerModel) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.gold = data.gold;
  }
}
