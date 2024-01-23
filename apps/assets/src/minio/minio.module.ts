import { Module } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';

@Module({
  controllers: [MinioController],
  providers: [
    MinioService,
    {
      provide: 'MINIO',
      useFactory: () => {
        const minioClient = new Minio.Client({
          endPoint: process.env.MINIO_ENDPOINT as string,
          port: parseInt(process.env.MINIO_PORT as string),
          useSSL: false,
          accessKey: process.env.MINIO_ACCESS_KEY as string,
          secretKey: process.env.MINIO_SECRET_KEY as string,
        });

        return minioClient;
      },
    },
  ],
})
export class MinioModule {}
