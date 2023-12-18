import { Body, Controller, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CollectionTranslationService } from './collection-translation.service';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { CreateCollectionTranslationDto } from './dto/create.dto';
import { UpdateCollectionTranslationDto } from './dto/update.dto';

@ApiTags('Collections Translation')
@Controller('collection-translation')
export class CollectionTranslationController {
  constructor(private service: CollectionTranslationService) {}

  /**
   * Create a collection translation
   * @param body
   * @returns
   */
  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'Collection translation was created successfully',
  })
  @ApiBody({ type: CreateCollectionTranslationDto })
  create(@Body() body: CreateCollectionTranslationDto) {
    return this.service.create(body);
  }

  /**
   * Update collection translation
   * @param body
   * @returns
   */
  @Put()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'Collection translation was updated successfully',
  })
  @ApiBody({ type: UpdateCollectionTranslationDto })
  update(@Body() body: UpdateCollectionTranslationDto) {
    return this.service.update(body);
  }
}
