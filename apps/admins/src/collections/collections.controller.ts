import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create.dto';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdateCollectionDto } from './dto/update.dto';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly service: CollectionsService) {}

  /**
   * Create collection. Collections have a higherrachy structure. A collection can `Optionaly` have multiple descendants (Children) and/or a parent collection.
   *
   * @param body
   * @returns
   */
  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
  })
  async create(@Body() body: CreateCollectionDto) {
    return await this.service.create(body);
  }

  /**
   * Update a collection by `ID`.
   * @param body
   * @returns
   */
  @Put()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
  })
  async update(@Body() body: UpdateCollectionDto) {
    return await this.service.update(body);
  }

  /**
   * Find all collections (including children)
   * @returns
   */
  @Get('all')
  findMany() {
    return this.service.findAll();
  }

  /**
   * Find collection by `ID`
   * @param id
   * @returns
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.getById(+id);
  }
}
