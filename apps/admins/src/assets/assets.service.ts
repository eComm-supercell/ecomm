import { Injectable } from '@nestjs/common';
import { SaveAssetDto } from './dto/save.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { MinioService } from '@libs/common/src/minio/minio.service';

@Injectable()
export class AssetsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async upload(file: Express.Multer.File) {
    return await this.minio.upload(file);
  }

  listObjetsOfBucket(bucketName: string) {
    return this.minio.listAssetsOfBucket(bucketName);
  }

  async save(body: SaveAssetDto) {
    return await this.prisma.asset.create({
      data: {
        name: body.name,
        type: body.type,
        mimeType: body.mimeType,
        width: body.width,
        height: body.height,
        fileSize: body.fileSize,
        source: body.source,
        preview: body.preview,
      },
    });
  }

  async listSavedAssets() {
    return await this.prisma.asset.findMany();
  }
}
