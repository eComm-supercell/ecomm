import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { AddressEntity } from './entities/address.entity';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
import { FindQueryDto } from './dto/find-address.dto';

@Controller('address')
@ApiTags('Address')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /**
   * Create a new Address record.
   *
   */
  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AddressEntity,
  })
  @apiExceptionResponse()
  create(@Body() createAddressDto: CreateAddressDto): Promise<AddressEntity> {
    return this.addressService.create(createAddressDto);
  }

  // @Get()
  // findAll(): Promise<AddressEntity[]> {
  //   return this.addressService.findAll();
  // }

  /**
   * Get a single Address record either by address ID or profile ID.
   *
   */
  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: AddressEntity,
  })
  findOne(@Query() params: FindQueryDto): Promise<AddressEntity | null> {
    return this.addressService.findOne(params);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: AddressEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressEntity> {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
