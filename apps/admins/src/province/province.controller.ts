import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import {
  ProvinceEntity,
  ProvinceWitCityEntity,
} from './entities/province.entity';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';

@ApiBearerAuth()
@Controller('province')
@ApiTags('Province')
@UseGuards(JwtGuard)
export default class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  /**
   * Create a new province record. Provice names are the official iraqi province names.
   *
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The province has been successfully created.',
  })
  @apiExceptionResponse()
  create(
    @Body() createProvinceDto: CreateProvinceDto,
  ): Promise<ProvinceEntity | null> {
    return this.provinceService.create(createProvinceDto);
  }

  /**
   * Get all provinces. Provice names are the official iraqi province names and are always 18 as of 2021.
   *
   */
  @Get()
  @ApiOkResponse({
    description: 'All provinces have been successfully retrieved.',
    type: ProvinceWitCityEntity,
    isArray: true,
  })
  findAll(): Promise<ProvinceWitCityEntity[]> {
    return this.provinceService.findAll();
  }

  /**
   * Get a province by id. Provice names are the official iraqi province names and are always 18 as of 2021.
   *
   */
  @Get(':id')
  @ApiOkResponse({
    description: 'Province have been successfully retrieved.',
    type: ProvinceWitCityEntity,
  })
  @ApiOkResponse({
    description: 'The province has been successfully retrieved.',
  })
  findOne(@Param('id') id: string): Promise<ProvinceWitCityEntity | null> {
    return this.provinceService.findOne(+id);
  }

  /**
   * Update a province by id. You can update `city, name and delivery info` through this API endpoint. Note that the name is the official iraqi province name and CAN NOT be DUPLICATED with another province.
   */
  @Patch(':id')
  @ApiOkResponse({
    description: 'The province has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<ProvinceEntity | null> {
    return this.provinceService.update(+id, updateProvinceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.provinceService.remove(+id);
  }
}
