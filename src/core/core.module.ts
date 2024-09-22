import { Module } from '@nestjs/common';
import { PrismaService } from './data';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
