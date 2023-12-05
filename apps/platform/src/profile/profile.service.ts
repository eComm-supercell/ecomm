import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { User } from '@prisma/client';
import { ProfileEntity } from './entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  private readonly include = {
    id: true,
    dateOfBirth: true,
    gender: true,
    mobile: true,
    userId: true,
    addressId: true,
  };
  async create(
    user: User,
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    const record = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      select: this.include,
    });

    return record;
  }

  // findAll() {
  //   return `This action returns all profile`;
  // }

  async findOne(id: number): Promise<ProfileEntity | null> {
    const data: ProfileEntity | null = await this.prisma.profile.findUnique({
      where: { id },
      select: this.include,
    });
    return data;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const update = await this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
      select: this.include,
    });
    return update;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} profile`;
  // }
}
