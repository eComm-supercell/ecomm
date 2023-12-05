import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiKeyService } from './api-key.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { UpdateApiKeyDto } from './dto/update-api-key.dto';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { ApiKeyEntity } from './entities/api-key.entity';

@ApiTags('Api key')
@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ApiKeyEntity,
  })
  create(@Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeyService.create(createApiKeyDto);
  }

  // @Get()
  // findAll() {
  //   return this.apiKeyService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: ApiKeyEntity,
  })
  findOne(@Param('id') id: string) {
    return this.apiKeyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ApiKeyEntity,
  })
  @apiExceptionResponse()
  update(@Param('id') id: string, @Body() updateApiKeyDto: UpdateApiKeyDto) {
    return this.apiKeyService.update(+id, updateApiKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apiKeyService.remove(+id);
  }
}
