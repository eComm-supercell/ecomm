import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

/**
 * Parese files for validation. Current rules are
 *
 *  1- Only image files are allowed (excluding SVG).
 *
 *  2- File size should not exceed 5 MB.
 */
@Injectable()
export class ParseAssetPipe implements PipeTransform<Express.Multer.File> {
  transform(file: Express.Multer.File): Express.Multer.File {
    const allowedImageTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/bmp',
    ];

    if (!allowedImageTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only image files are allowed (excluding SVG).',
      );
    }

    const maxSize = 1024 * 1024 * 5; // 5 MB

    if (file.size > maxSize) {
      throw new BadRequestException(
        `File size exceeds the limit of ${maxSize / (1024 * 1024)} MB.`,
      );
    }

    return file;
  }
}
