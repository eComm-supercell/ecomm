import { Inject, Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { from } from 'rxjs';

@Injectable()
export class MinioService {
  constructor(@Inject('MINIO') private readonly minioClient: Minio.Client) {}

  async upload(file: any) {
    const { originalname } = file;

    const bucketName = 'ecomm-assets';
    const objectName = `${bucketName}/${originalname}`;

    await this.minioClient.putObject(
      bucketName,
      objectName,
      Buffer.from(file.buffer, 'binary'),
    );

    const url = await this.minioClient.presignedUrl(
      'GET',
      bucketName,
      objectName,
    );

    return {
      source: url,
      name: objectName,
      mimetype: file.mimetype,
      fileSize: file.size,
      type: file.mimetype.split('/')[0],
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
