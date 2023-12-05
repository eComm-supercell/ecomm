import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import {
  ProvinceEntity,
  ProvinceWitCityEntity,
} from './entities/province.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async create(
    createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity | null> {
    return await this.prisma.province.create({
      data: {
        deleviryFee: createProvinceDto.deleviryFee,
        deleviryTime: createProvinceDto.deleviryTime,
        name: createProvinceDto.name,
      },
    });
  }

  async findAll(): Promise<ProvinceWitCityEntity[]> {
    return await this.prisma.province.findMany({
      include: {
        city: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  findOne(id: number): Promise<ProvinceWitCityEntity | null> {
    return this.prisma.province.findUnique({
      where: {
        id,
      },
      include: {
        city: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceEntity | null> {
    const record: Prisma.ProvinceUpdateInput = {};

    if (updateProvinceDto.cities && updateProvinceDto.cities.length > 0) {
      // connect only new cities
      record.city = {
        set: [],
        connect: updateProvinceDto.cities.map((city) => ({ id: city })),
      };
    }

    record.name = updateProvinceDto.name;
    record.deleviryFee = updateProvinceDto.deleviryFee;
    record.deleviryTime = updateProvinceDto.deleviryTime;

    return await this.prisma.province.update({
      where: {
        id,
      },
      data: record,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} province`;
  }
}
