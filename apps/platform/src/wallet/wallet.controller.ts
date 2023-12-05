import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
// import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletEntity } from './entity/wallet.entity';

@Controller('wallet')
@ApiTags('Wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @Post()
  // create(@Body() createWalletDto: CreateWalletDto) {
  //   return this.walletService.create(createWalletDto);
  // }

  // @Get()
  // findAll() {
  //   return this.walletService.findAll();
  // }

  /**
   * Get wallet by id
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the wallet with the given id.',
    type: WalletEntity,
  })
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  /**
   * Update wallet by id. Only `amount` can be updated.
   *
   */
  @Patch()
  update(@Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(updateWalletDto);
  }

  /**
   * Remove wallet by id.
   *
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
