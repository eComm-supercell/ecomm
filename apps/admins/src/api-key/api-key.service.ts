import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}
  private readonly select = {
    id: true,
    createdAt: true,
    updatedAt: true,
    key: true,
  };
  async create(createApiKeyDto: CreateApiKeyDto) {
    return await this.prisma.apiKey.create({
      data: createApiKeyDto,
      select: this.select,
    });
  }

  // findAll() {
  //   return `This action returns all apiKey`;
  // }

  async findOne(id: number) {
    return await this.prisma.apiKey.findUnique({
      where: { id },
      select: this.select,
    });
  }

  async update(id: number, updateApiKeyDto: UpdateApiKeyDto) {
    return await this.prisma.apiKey.update({
      where: { id },
      data: updateApiKeyDto,
      select: this.select,
    });
  }

  remove(id: number) {
    return this.prisma.apiKey.delete({ where: { id }, select: this.select });
  }
}
