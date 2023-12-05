import { Injectable } from '@nestjs/common';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class SystemConfigService {
  constructor(private prisma: PrismaService) {}

  async create(createSystemConfigDto: CreateSystemConfigDto) {
    return await this.prisma.systemConfig.create({
      data: {
        endHour: createSystemConfigDto.endHour,
        forceClose: createSystemConfigDto.forceClose,
        forceCloseMessage: createSystemConfigDto.forceCloseMessage,
        minOrderAmount: createSystemConfigDto.minOrderAmount,
        pricePerKm: createSystemConfigDto.pricePerKm,
        startHour: createSystemConfigDto.startHour,
        allowGuestCheckout: createSystemConfigDto.allowGuestCheckout,
        appConfig: {
          connect: {
            id: createSystemConfigDto.mobileAppConfigId,
          },
        },
      },
      include: { appConfig: true },
    });
  }

  // findAll() {
  //   return `This action returns all systemConfig`;
  // }

  async findOne(id: number) {
    return await this.prisma.systemConfig.findUnique({
      where: { id },
      include: { appConfig: true },
    });
  }

  async update(id: number, updateSystemConfigDto: UpdateSystemConfigDto) {
    await this.prisma.systemConfig.update({
      where: { id },
      data: {
        allowGuestCheckout: updateSystemConfigDto.allowGuestCheckout,
        endHour: updateSystemConfigDto.endHour,
        forceClose: updateSystemConfigDto.forceClose,
        forceCloseMessage: updateSystemConfigDto.forceCloseMessage,
        minOrderAmount: updateSystemConfigDto.minOrderAmount,
        pricePerKm: updateSystemConfigDto.pricePerKm,
        startHour: updateSystemConfigDto.startHour,
        appConfig: {
          connect: {
            id: updateSystemConfigDto.mobileAppConfigId,
          },
        },
      },
      include: { appConfig: true },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} systemConfig`;
  }
}
