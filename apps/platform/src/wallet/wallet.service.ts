import { Injectable } from '@nestjs/common';
// import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}
  // create(createWalletDto: CreateWalletDto) {
  //   return 'This action adds a new wallet';
  // }

  // findAll() {
  //   return `This action returns all wallet`;
  // }

  findOne(id: number) {
    return this.prisma.wallet.findUnique({
      where: { id },
    });
  }

  update(updateWalletDto: UpdateWalletDto) {
    const { amount, id } = updateWalletDto;

    return this.prisma.wallet.update({
      where: { id },
      data: { amount },
    });
  }

  remove(id: number) {
    return this.prisma.wallet.delete({
      where: { id },
    });
  }
}
