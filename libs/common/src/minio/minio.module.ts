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
          endPoint: '82.129.21.154',
          port: 9000,
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
