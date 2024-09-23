import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Offer } from 'src/offers/domain/entities/offer.entity';
import { OfferRepository } from 'src/offers/domain/offer.repository';
import { CreateOfferDto } from '../dtos/create-offer.dto';
import { PlayerRepository } from 'src/players/domain/player.repository';
import { ItemRepository } from 'src/items/domain/item.repository';
import { OfferType } from 'src/offers/domain/offer-type.enum';
import { InventoryRepository } from 'src/inventories/domain/inventory.repository';
import { UpdateOfferdto } from '../dtos/update-offer.dto';
import { Player } from 'src/players/domain/entities/player.entity';

@Injectable()
export class OffersService {
  constructor(
    private readonly offerRepository: OfferRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly itemRepository: ItemRepository,
    private readonly inventoryRepository: InventoryRepository,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const player = await this.playerRepository.findById(
      createOfferDto.playerId,
    );
    if (!player) {
      throw new NotFoundException(
        `Player with ID ${createOfferDto.playerId} not found`,
      );
    }

    const itemExists = await this.itemRepository.findById(
      createOfferDto.itemId,
    );
    if (!itemExists) {
      throw new NotFoundException(
        `Item with ID ${createOfferDto.itemId} not found`,
      );
    }

    if (createOfferDto.type === OfferType.BUY) {
      const totalPrice = createOfferDto.pricePerUnit * createOfferDto.quantity;
      if (totalPrice > player.gold) {
        throw new BadRequestException(
          `Insufficient gold to create this buy offer.`,
        );
      }

      const sellOffer = await this.offerRepository.findSellOffer(
        createOfferDto.itemId,
        createOfferDto.pricePerUnit,
        createOfferDto.playerId,
        createOfferDto.quantity,
      );

      if (sellOffer) {
        await this.handlePurchase(createOfferDto, sellOffer, player);
        return null;
      } else {
        return this.offerRepository.create(createOfferDto);
      }
    } else if (createOfferDto.type === OfferType.SELL) {
      const inventoryItem = await this.inventoryRepository.findByPlayerAndItem(
        createOfferDto.playerId,
        createOfferDto.itemId,
      );

      if (!inventoryItem || inventoryItem.quantity < createOfferDto.quantity) {
        throw new BadRequestException(
          `Insufficient quantity in inventory to create this sell offer.`,
        );
      }

      const totalValue = createOfferDto.pricePerUnit * createOfferDto.quantity;
      await this.inventoryRepository.update(inventoryItem.id, {
        quantity: inventoryItem.quantity - createOfferDto.quantity,
      });

      const buyOffer = await this.offerRepository.findBuyOffer(
        createOfferDto.itemId,
        createOfferDto.pricePerUnit,
        createOfferDto.playerId,
        createOfferDto.quantity,
      );

      if (buyOffer) {
        await this.handleSale(createOfferDto, buyOffer, player);
        return null;
      } else {
        return this.offerRepository.create(createOfferDto);
      }
    }

    return this.offerRepository.create(createOfferDto);
  }

  private async handlePurchase(
    createOfferDto: CreateOfferDto,
    sellOffer: Offer,
    buyer: Player,
  ) {
    const buyerInventory = await this.inventoryRepository.findByPlayerAndItem(
      createOfferDto.playerId,
      createOfferDto.itemId,
    );

    if (buyerInventory) {
      const newQuantity = buyerInventory.quantity + createOfferDto.quantity;
      await this.inventoryRepository.update(buyerInventory.id, {
        quantity: newQuantity,
      });
    } else {
      await this.inventoryRepository.create({
        playerId: createOfferDto.playerId,
        itemId: createOfferDto.itemId,
        quantity: createOfferDto.quantity,
      });
    }

    const sellerInventory = await this.inventoryRepository.findByPlayerAndItem(
      sellOffer.playerId,
      sellOffer.itemId,
    );
    if (sellerInventory) {
      const newQuantity = sellerInventory.quantity - sellOffer.quantity;
      if (newQuantity <= 0) {
        await this.inventoryRepository.delete(sellerInventory.id);
      } else {
        await this.inventoryRepository.update(sellerInventory.id, {
          quantity: newQuantity,
        });
      }
    }

    const totalPrice = createOfferDto.pricePerUnit * createOfferDto.quantity;
    await this.playerRepository.update(buyer.id, {
      gold: buyer.gold - totalPrice,
      nickname: buyer.nickname,
    });
    const seller = await this.playerRepository.findById(sellOffer.playerId);
    await this.playerRepository.update(seller.id, {
      gold: seller.gold + totalPrice,
      nickname: seller.nickname,
    });

    await this.offerRepository.delete(sellOffer.id);
  }

  private async handleSale(
    createOfferDto: CreateOfferDto,
    buyOffer: Offer,
    seller: Player,
  ) {
    const sellerInventory = await this.inventoryRepository.findByPlayerAndItem(
      createOfferDto.playerId,
      createOfferDto.itemId,
    );

    if (sellerInventory) {
      const newQuantity = sellerInventory.quantity - createOfferDto.quantity;
      if (newQuantity <= 0) {
        await this.inventoryRepository.delete(sellerInventory.id);
      } else {
        await this.inventoryRepository.update(sellerInventory.id, {
          quantity: newQuantity,
        });
      }
    } else {
      throw new NotFoundException(`Seller does not have the item in inventory`);
    }

    const buyerInventory = await this.inventoryRepository.findByPlayerAndItem(
      buyOffer.playerId,
      buyOffer.itemId,
    );
    if (buyerInventory) {
      const newQuantity = buyerInventory.quantity + buyOffer.quantity;
      await this.inventoryRepository.update(buyerInventory.id, {
        quantity: newQuantity,
      });
    } else {
      await this.inventoryRepository.create({
        playerId: buyOffer.playerId,
        itemId: buyOffer.itemId,
        quantity: buyOffer.quantity,
      });
    }

    const totalPrice = buyOffer.pricePerUnit * buyOffer.quantity;
    const buyer = await this.playerRepository.findById(buyOffer.playerId);
    await this.playerRepository.update(buyer.id, {
      gold: buyer.gold - totalPrice,
      nickname: buyer.nickname,
    });
    await this.playerRepository.update(seller.id, {
      gold: seller.gold + totalPrice,
      nickname: seller.nickname,
    });

    await this.offerRepository.delete(buyOffer.id);
  }

  async update(id: number, updateOfferDto: UpdateOfferdto): Promise<Offer> {
    const existingOffer = await this.offerRepository.findById(id);
    if (!existingOffer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    const playerExists = await this.playerRepository.findById(
      updateOfferDto.playerId,
    );
    if (!playerExists) {
      throw new NotFoundException(
        `Player with ID ${updateOfferDto.playerId} not found`,
      );
    }

    const itemExists = await this.itemRepository.findById(
      updateOfferDto.itemId,
    );
    if (!itemExists) {
      throw new NotFoundException(
        `Item with ID ${updateOfferDto.itemId} not found`,
      );
    }

    const createOfferDto: CreateOfferDto = {
      type: updateOfferDto.type,
      pricePerUnit: updateOfferDto.pricePerUnit,
      quantity: updateOfferDto.quantity,
      playerId: updateOfferDto.playerId,
      itemId: updateOfferDto.itemId,
      endsAt: updateOfferDto.endsAt,
    };

    if (createOfferDto.type === OfferType.BUY) {
      const sellOffer = await this.offerRepository.findSellOffer(
        createOfferDto.itemId,
        createOfferDto.pricePerUnit,
        createOfferDto.playerId,
        createOfferDto.quantity,
      );

      if (sellOffer) {
        await this.handlePurchase(createOfferDto, sellOffer, playerExists);
        return sellOffer;
      }
    } else if (createOfferDto.type === OfferType.SELL) {
      const buyOffer = await this.offerRepository.findBuyOffer(
        createOfferDto.itemId,
        createOfferDto.pricePerUnit,
        createOfferDto.playerId,
        createOfferDto.quantity,
      );

      if (buyOffer) {
        await this.handleSale(createOfferDto, buyOffer, playerExists);
        return buyOffer;
      }
    }

    return this.offerRepository.update(id, updateOfferDto);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.findAll();
  }

  async findById(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findById(id);
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return offer;
  }

  async delete(id: number): Promise<void> {
    return this.offerRepository.delete(id);
  }
}
