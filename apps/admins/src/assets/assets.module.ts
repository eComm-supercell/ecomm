import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { MinioModule } from '@libs/common/src/minio/minio.module';

@Module({
  imports: [PrismaModule, MinioModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
