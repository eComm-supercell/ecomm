import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SystemConfigService } from './system-config.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { SystemConfigEntity } from './entities/system-config.entity';

@Controller('system-config')
@ApiTags('System')
export class SystemConfigController {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SystemConfigEntity,
  })
  create(@Body() createSystemConfigDto: CreateSystemConfigDto) {
    return this.systemConfigService.create(createSystemConfigDto);
  }

  // @Get()
  // findAll() {
  //   return this.systemConfigService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    type: SystemConfigEntity,
  })
  findOne(@Param('id') id: string) {
    return this.systemConfigService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    type: SystemConfigEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateSystemConfigDto: UpdateSystemConfigDto,
  ) {
    return this.systemConfigService.update(+id, updateSystemConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemConfigService.remove(+id);
  }
}
