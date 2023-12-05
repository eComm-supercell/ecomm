import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class AuditLogService {
  constructor(private prisma: PrismaService) {}
  private readonly select: {
    id: true;
    action: true;
    entity: true;
    entityId: true;
    query: true;
    userId: true;
    createdAt: true;
  };
  async create(createAuditLogDto: CreateAuditLogDto) {
    return await this.prisma.auditLog.create({
      data: createAuditLogDto,
      select: this.select,
    });
  }

  // findAll() {
  //   return this.prisma.auditLog.findMany({ select: this.select });
  // }

  findOne(id: number) {
    return this.prisma.auditLog.findUnique({
      where: { id },
      select: this.select,
    });
  }

  update(id: number, updateAuditLogDto: UpdateAuditLogDto) {
    return this.prisma.auditLog.update({
      where: { id },
      data: updateAuditLogDto,
      select: this.select,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} auditLog`;
  }
}
