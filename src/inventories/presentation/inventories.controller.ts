import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { InventoriesService } from '../application/services/inventories.service';
import { CreateInventoryDto } from '../application/dtos/create-inventory.dto';
import { Inventory } from '../domain/entities/inventory.entity';
import { UpdateInventoryDto } from '../application/dtos/update-inventory.dto';

@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  async create(
    @Body() createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Inventory> {
    return this.inventoriesService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    return this.inventoriesService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.inventoriesService.delete(id);
  }
}
