import { Injectable } from '@nestjs/common';
import { CreateNotificationTokenDto } from './dto/create-notification-token.dto';
import { UpdateNotificationTokenDto } from './dto/update-notification-token.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class NotificationTokenService {
  constructor(private prisma: PrismaService) {}
  private readonly select = {
    id: true,
    token: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        id: true,
      },
    },
  };

  async create(createNotificationTokenDto: CreateNotificationTokenDto) {
    const { userId, ...data } = createNotificationTokenDto;
    return await this.prisma.notificationToken.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: this.select,
    });
  }

  // findAll() {
  //   return `This action returns all notificationToken`;
  // }

  findOne(id: number) {
    return this.prisma.notificationToken.findUnique({
      where: {
        id,
      },
      select: this.select,
    });
  }

  update(id: number, updateNotificationTokenDto: UpdateNotificationTokenDto) {
    return this.prisma.notificationToken.update({
      where: {
        id,
      },
      data: updateNotificationTokenDto,
      select: this.select,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} notificationToken`;
  }
}
