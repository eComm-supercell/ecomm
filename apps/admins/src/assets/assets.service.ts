import { handleMicroserviceExceptions } from '@libs/common/src/utils/microservicesExceptionHandler';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SaveAssetDto } from './dto/save.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(
    @Inject('ASSETS') private clientAssets: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  async upload(file: Express.Multer.File) {
    return await lastValueFrom(
      this.clientAssets
        .send({ cmd: 'upload' }, { file })
        .pipe(handleMicroserviceExceptions()),
    );
  }

  listObjetsOfBucket(bucketName: string) {
    return lastValueFrom(
      this.clientAssets
        .send({ cmd: 'list-objects-of-bucket' }, { bucketName })
        .pipe(handleMicroserviceExceptions()),
    );
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
