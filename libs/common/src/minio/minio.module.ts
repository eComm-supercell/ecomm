import { Global, Module } from '@nestjs/common';
import * as Minio from 'minio';
import { MinioService } from './minio.service';

@Global()
@Module({
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
  exports: ['MINIO', MinioService],
})
export class MinioModule {}
