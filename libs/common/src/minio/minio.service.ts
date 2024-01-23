import { Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { from } from 'rxjs';

@Injectable()
export class MinioService {
  constructor(@Inject('MINIO') private readonly minioClient: Minio.Client) {}

  async upload(object: any) {
    const { originalname } = object.file;

    const bucketName = 'ecomm-assets';
    const objectName = `${bucketName}/${originalname}`;

    await this.minioClient.putObject(
      bucketName,
      objectName,
      Buffer.from(object.file.buffer, 'binary'),
    );

    const url = await this.minioClient.presignedUrl(
      'GET',
      bucketName,
      objectName,
    );

    return {
      source: url,
      name: objectName,
      mimetype: object.file.mimetype,
      fileSize: object.file.size,
      type: object.file.mimetype.split('/')[0],
      bucketName,
    };
  }

  listAssetsOfBucket(bucketName: string) {
    return from(
      this.minioClient.extensions.listObjectsV2WithMetadata(
        bucketName,
        '',
        true,
      ),
    );
  }
}
