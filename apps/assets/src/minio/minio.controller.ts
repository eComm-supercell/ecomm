import { ExceptionFilter } from '@libs/common/src/exceptions/custom-rcp-exception.filter';
import { Controller, UseFilters } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

@UseFilters(new ExceptionFilter())
@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @MessagePattern({ cmd: 'upload' })
  async upload(file: Express.Multer.File) {
    try {
      return await this.minioService.upload(file);
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }

  @MessagePattern({ cmd: 'list-objects-of-bucket' })
  listObjectsOfBucket(@Payload() data: { bucketName: string }) {
    try {
      return this.minioService.listAssetsOfBucket(data.bucketName);
    } catch (error) {
      console.error(error);
      throw new RpcException(error);
    }
  }
}
