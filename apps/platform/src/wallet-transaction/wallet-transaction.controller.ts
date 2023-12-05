import {
  Controller,
  Get,
  // Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletTransactionService } from './wallet-transaction.service';
// import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletTransactionEntity } from './entity/wallet-transaction.entity';

@Controller('wallet-transaction')
@ApiTags('Wallet Transaction')
export class WalletTransactionController {
  constructor(
    private readonly walletTransactionService: WalletTransactionService,
  ) {}

  // @Post()
  // create(@Body() createWalletTransactionDto: CreateWalletTransactionDto) {
  //   return this.walletTransactionService.create(createWalletTransactionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.walletTransactionService.findAll();
  // }

  /**
   * Get wallet transaction by id
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Returns the wallet transaction with the given id.',
    type: WalletTransactionEntity,
  })
  findOne(@Param('id') id: string) {
    return this.walletTransactionService.findOne(+id);
  }

  /**
   *  Update wallet transaction by id. Only status can be updated.
   */
  @Patch(':id')
  update(@Body() updateWalletTransactionDto: UpdateWalletTransactionDto) {
    return this.walletTransactionService.update(updateWalletTransactionDto);
  }

  /**
   *
   * Remove wallet transaction by id.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletTransactionService.remove(+id);
  }
}
