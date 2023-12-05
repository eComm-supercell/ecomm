import { Injectable } from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class AttachmentsService {
  constructor(@InjectQueue('img-optimization') private imgQueue: Queue) {}

  async create(
    createAttachmentDto: CreateAttachmentDto,
    file: Express.Multer.File,
  ) {
    await this.imgQueue.add('resize', {
      attachmentId: createAttachmentDto.id,
      filePath: file.path,
    });
    return createAttachmentDto;
  }

  findAll() {
    return `This action returns all attachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return `This action updates a #${id} attachment with ${updateAttachmentDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
