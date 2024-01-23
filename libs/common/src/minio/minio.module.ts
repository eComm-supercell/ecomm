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
          endPoint: 'minio.digital-logic.tech',
          port: 9999,
          useSSL: false,
          accessKey: '0aXhwvCKVWbx6bV2ka8a',
          secretKey: 's9HtSP2mltEZGh7LZxBcibCpdL2IEZLyUMEEvjjy',
        });

        return minioClient;
      },
    },
  ],
  exports: ['MINIO', MinioService],
})
export class MinioModule {}
