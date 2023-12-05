import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateMobileAppConfigDto } from './dto/create-mobile-app-config.dto';
import { UpdateMobileAppConfigDto } from './dto/update-mobile-app-config.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class MobileAppConfigService {
  constructor(private prisma: PrismaService) {}
  async create(createMobileAppConfigDto: CreateMobileAppConfigDto) {
    return await this.prisma.mobileAppConfig.create({
      data: createMobileAppConfigDto,
      include: { systemConfig: true },
    });
  }

  // findAll() {
  //   return `This action returns all mobileAppConfig`;
  // }

  async findOne(id: number) {
    return await this.prisma.mobileAppConfig.findUnique({
      where: { id },
      include: { systemConfig: true },
    });
  }

  async update(id: number, updateMobileAppConfigDto: UpdateMobileAppConfigDto) {
    const { systemConfig, ...rest } = updateMobileAppConfigDto;

    const record: Prisma.MobileAppConfigUpdateInput = {};

    if (systemConfig && systemConfig.length > 0) {
      // connect new systemConfig ids
      await this.prisma.mobileAppConfig.update({
        where: { id },
        data: {
          systemConfig: {
            connect: systemConfig.map((sysConfigId) => ({ id: sysConfigId })),
          },
        },
      });
    }

    record.appConfig = rest.appConfig;
    record.appVersion = rest.appVersion;
    record.retailLayout = rest.retailLayout;
    record.resturantLayout = rest.resturantLayout;

    return await this.prisma.mobileAppConfig.update({
      where: { id },
      data: record,
      include: { systemConfig: true },
    });
  }

  remove(id: number) {
    return this.prisma.mobileAppConfig.delete({ where: { id } });
  }
}
