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
import { DeliveryBoysService } from './delivery-boys.service';
import { CreateDeliveryBoyDto } from './dto/create-delivery-boy.dto';
import { UpdateDeliveryBoyDto } from './dto/update-delivery-boy.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { DeliveryBoyEntity } from './entities/delivery-boy.entity';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';

@ApiBearerAuth()
@Controller('delivery-boys')
@ApiTags('Delivery Boy')
@UseGuards(JwtGuard)
export class DeliveryBoysController {
  constructor(private readonly deliveryBoysService: DeliveryBoysService) {}

  /**
   * Create a delivery boy. Only one delivery boy is allowed per user.
   *
   */
  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: DeliveryBoyEntity,
  })
  create(
    @Body() createDeliveryBoyDto: CreateDeliveryBoyDto,
  ): Promise<DeliveryBoyEntity> {
    return this.deliveryBoysService.create(createDeliveryBoyDto);
  }

  // @Get()
  // findAll() {
  //   return this.deliveryBoysService.findAll();
  // }

  /**
   * Get delivery boy by id.
   *
   */
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
    type: DeliveryBoyEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<DeliveryBoyEntity | null> {
    return this.deliveryBoysService.findOne(+id);
  }

  /**
   * Update delivery boy. All fields are optional.
   * You can:
   *  1- change all fields
   *  2- change the user that is connected to the delivery boy
   *
   */
  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: DeliveryBoyEntity,
  })
  update(
    @Param('id') id: string,
    @Body() updateDeliveryBoyDto: UpdateDeliveryBoyDto,
  ): Promise<DeliveryBoyEntity> {
    return this.deliveryBoysService.update(+id, updateDeliveryBoyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryBoysService.remove(+id);
  }
}
