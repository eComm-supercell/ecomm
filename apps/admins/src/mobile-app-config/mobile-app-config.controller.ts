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
import { MobileAppConfigService } from './mobile-app-config.service';
import { CreateMobileAppConfigDto } from './dto/create-mobile-app-config.dto';
import { UpdateMobileAppConfigDto } from './dto/update-mobile-app-config.dto';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { MobileAppConfigEntity } from './entities/mobile-app-config.entity';

@Controller('mobile-app-config')
@ApiTags('Mobile App')
export class MobileAppConfigController {
  constructor(
    private readonly mobileAppConfigService: MobileAppConfigService,
  ) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: MobileAppConfigEntity,
  })
  create(@Body() createMobileAppConfigDto: CreateMobileAppConfigDto) {
    return this.mobileAppConfigService.create(createMobileAppConfigDto);
  }

  // @Get()
  // findAll() {
  //   return this.mobileAppConfigService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: MobileAppConfigEntity,
  })
  findOne(@Param('id') id: string) {
    return this.mobileAppConfigService.findOne(+id);
  }

  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: MobileAppConfigEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateMobileAppConfigDto: UpdateMobileAppConfigDto,
  ) {
    return this.mobileAppConfigService.update(+id, updateMobileAppConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileAppConfigService.remove(+id);
  }
}
