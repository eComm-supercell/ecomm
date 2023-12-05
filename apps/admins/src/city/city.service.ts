/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { AppCustomException } from '@libs/common/src/exceptions/custom-exception';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  private selectCity: Prisma.CitySelect = {
    id: true,
    name: true,
    deleviryFee: true,
    deleviryTime: true,
    province: true,
  };

  async create(createCityDto: CreateCityDto) {
    return await this.prisma.city.create({
      data: {
        name: createCityDto.name,
        deleviryFee: createCityDto.deleviryFee,
        deleviryTime: createCityDto.deleviryTime,
        province: {
          connect: {
            id: createCityDto.provinceId,
          },
        },
      },
      select: this.selectCity,
    });
  }

  // async findAll() {
  //   return await this.prisma.city.findMany({
  //     include: {
  //       province: true,
  //     },
  //   });
  // }

  async findOne(id: number) {
    return this.prisma.city.findUnique({
      where: {
        id,
      },
      select: this.selectCity,
    });
  }

  async update(id: number, updateCityDto: UpdateCityDto) {
    // check if the city name is duplicated in the same province
    if (updateCityDto.name && updateCityDto.provinceId) {
      const duplicated = await this.prisma.city.findFirst({
        where: {
          AND: [
            {
              province: {
                id: updateCityDto.provinceId,
              },
            },
            {
              name: updateCityDto.name,
            },
          ],
        },
      });

      if (duplicated) {
        throw new AppCustomException('cityNameDuplicated');
      }
    }

    let city: Prisma.CityUpdateInput;
    // Update city with province
    if (updateCityDto.provinceId) {
      city = {
        name: updateCityDto.name,
        deleviryFee: updateCityDto.deleviryFee,
        deleviryTime: updateCityDto.deleviryTime,
        province: {
          connect: {
            id: updateCityDto.provinceId,
          },
        },
      };
    } else {
      // Update city without province
      city = {
        name: updateCityDto.name,
        deleviryFee: updateCityDto.deleviryFee,
        deleviryTime: updateCityDto.deleviryTime,
      };
    }

    return await this.prisma.city.update({
      where: {
        id,
      },
      data: city,
      select: this.selectCity,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} city`;
  // }
}
