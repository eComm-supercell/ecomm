import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AssetsService } from './assets.service';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetUploadDto } from './dto/upload.dto';
import { ParseAssetPipe } from '@libs/common/src/pipe/parse-asset.pipe';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { SaveAssetDto } from './dto/save.dto';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * Upload a file to Assets service
   */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Asset file',
    type: AssetUploadDto,
  })
  @UsePipes(new ParseAssetPipe())
  @UseInterceptors(FileInterceptor('asset'))
  @ApiCreatedResponse({
    description: 'Asset uploaded successfully',
    type: 'object',
    schema: {
      properties: {
        url: {
          type: 'string',
        },
      },
    },
  })
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.assetsService.upload(file);
  }

  /**
   * Save asset file to database.
   */
  @Post('save')
  @ApiBody({
    description: 'Asset file',
    type: SaveAssetDto,
  })
  @apiExceptionResponse()
  async saveAsset(@Body() body: SaveAssetDto) {
    return await this.assetsService.save(body);
  }

  /**
   * List all assets in a bucket
   */
  @Get('list/:bucketName')
  listAssets(@Param('bucketName') bucketName: string) {
    return this.assetsService.listObjetsOfBucket(bucketName);
  }

  /**
   * List all assets saved in the system database
   */
  @Get('saved-assets/list')
  listSavedAssets() {
    return this.assetsService.listSavedAssets();
  }
}
