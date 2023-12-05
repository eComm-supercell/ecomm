import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { NotificationsQueryDto } from './dto/query.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}
  private readonly select = {
    id: true,
    title: true,
    body: true,
    type: true,
    isRead: true,
    isDeleted: true,
    createdAt: true,
    updatedAt: true,
    user: {
      select: {
        id: true,
      },
    },
  };
  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, ...data } = createNotificationDto;
    return await this.prisma.notification.create({
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
  //   return `This action returns all notifications`;
  // }

  async findOne(id: number) {
    return await this.prisma.notification.findUnique({
      where: {
        id,
      },
      select: this.select,
    });
  }

  async findUserNotifications(params: NotificationsQueryDto) {
    // Return all notifications that belong to the user with the given ID and match the query parameters (if any). otherwise, return all notifications that belong to the user with the given ID.
    const { userId, ...query } = params;
    return await this.prisma.notification.findMany({
      where: {
        userId,
        ...query,
      },
      select: this.select,
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return await this.prisma.notification.update({
      where: {
        id,
      },
      data: updateNotificationDto,
      select: this.select,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
