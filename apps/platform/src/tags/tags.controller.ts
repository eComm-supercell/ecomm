import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TagEntity } from './entities/tag.entity';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { FindQueryDto } from './dto/find-tag.dto';

@ApiTags('Tags')
@Controller('tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiCreatedResponse({
    type: TagEntity,
  })
  @apiExceptionResponse()
  create(@Body() createTagDto: CreateTagDto): Promise<TagEntity> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiOkResponse({
    type: TagEntity,
    isArray: true,
  })
  findAll(@Query() findQuery?: FindQueryDto): Promise<TagEntity[]> {
    return this.tagsService.findAll(findQuery);
  }

  @Get(':id')
  @ApiOkResponse({
    type: TagEntity,
  })
  findOne(
    @Param('id') id: string,
    @Query() findQuery?: FindQueryDto,
  ): Promise<TagEntity | null> {
    return this.tagsService.findOne(+id, findQuery);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: TagEntity,
  })
  @apiExceptionResponse()
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TagEntity> {
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
