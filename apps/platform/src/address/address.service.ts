import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { AddressEntity } from './entities/address.entity';
import { FindQueryDto } from './dto/find-address.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  private readonly include = {
    city: {
      select: {
        id: true,
        name: true,
      },
    },
    province: {
      select: {
        id: true,
        name: true,
      },
    },
  };
  async create(createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    // Create address
    return await this.prisma.address.create({
      data: {
        street: createAddressDto.street,
        buildingNo: createAddressDto.buildingNo,
        floorNo: createAddressDto.floorNo,
        apartmentNo: createAddressDto.apartmentNo,
        latitude: createAddressDto.latitude,
        longitude: createAddressDto.longitude,
        profile: {
          connect: createAddressDto.profileId
            ? { id: createAddressDto.profileId }
            : undefined,
        },
        province: {
          connect: createAddressDto.provinceId
            ? { id: createAddressDto.provinceId }
            : undefined,
        },
        city: {
          connect: createAddressDto.cityId
            ? { id: createAddressDto.cityId }
            : undefined,
        },
      },
      include: this.include,
    });
  }

  // async findAll(): Promise<AddressEntity[]> {
  //   return await this.prisma.address.findMany({
  //     include: {
  //       city: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //       province: {
  //         select: {
  //           id: true,
  //           name: true,
  //         },
  //       },
  //     },
  //   });
  // }

  async findOne(params: FindQueryDto): Promise<AddressEntity | null> {
    return await this.prisma.address.findFirst({
      where: {
        id: params.addressId,
        profileId: params.profileId,
      },
      include: this.include,
    });
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    // Update address
    return await this.prisma.address.update({
      where: {
        id,
      },
      data: {
        apartmentNo: updateAddressDto.apartmentNo,
        buildingNo: updateAddressDto.buildingNo,
        floorNo: updateAddressDto.floorNo,
        street: updateAddressDto.street,
        longitude: updateAddressDto.longitude,
        latitude: updateAddressDto.latitude,
        city: {
          connect: updateAddressDto.cityId
            ? { id: updateAddressDto.cityId }
            : undefined,
        },
        province: {
          connect: updateAddressDto.provinceId
            ? { id: updateAddressDto.provinceId }
            : undefined,
        },
      },
      include: this.include,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
