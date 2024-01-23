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
          endPoint: 'assets.super-cell-dev.org',
          port: 9000,
          useSSL: true,
          accessKey: '7NB0jzUvDn9tUIq6E4PV',
          secretKey: '6HtLK1MvUINJ2zXGSXOabfUAK5Hn0OxveSgbyjV4',
        });

        return minioClient;
      },
    },
  ],
  exports: ['MINIO', MinioService],
})
export class MinioModule {}
