import { Injectable } from '@nestjs/common';
import { CreateDeliveryBoyDto } from './dto/create-delivery-boy.dto';
import { UpdateDeliveryBoyDto } from './dto/update-delivery-boy.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { DeliveryBoyEntity } from './entities/delivery-boy.entity';

@Injectable()
export class DeliveryBoysService {
  constructor(private prisma: PrismaService) {}

  async create(
    createDeliveryBoyDto: CreateDeliveryBoyDto,
  ): Promise<DeliveryBoyEntity> {
    const deliveryBoy = await this.prisma.deliveryBoy.create({
      data: createDeliveryBoyDto,
    });
    return deliveryBoy;
  }

  // findAll() {
  //   return `This action returns all deliveryBoys`;
  // }

  async findOne(id: number): Promise<DeliveryBoyEntity | null> {
    const record = await this.prisma.deliveryBoy.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            fname: true,
            lname: true,
            email: true,
            id: true,
            username: true,
          },
        },
      },
    });
    return record;
  }

  async update(
    id: number,
    updateDeliveryBoyDto: UpdateDeliveryBoyDto,
  ): Promise<DeliveryBoyEntity> {
    const { userId, ...rest } = updateDeliveryBoyDto;
    return await this.prisma.deliveryBoy.update({
      where: { id },
      data: {
        ...rest,
        user: userId
          ? {
              connect: {
                id: userId,
              },
            }
          : undefined,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryBoy`;
  }
}
