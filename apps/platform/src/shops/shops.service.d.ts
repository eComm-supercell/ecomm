import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { PrismaService } from '@app/prisma/prisma.service';
export declare class ShopsService {
  private readonly prisma;
  constructor(prisma: PrismaService);
  create(createShopDto: CreateShopDto): Promise<any>;
  findAll(): string;
  findOne(id: number): string;
  update(id: number, updateShopDto: UpdateShopDto): string;
  remove(id: number): string;
}
