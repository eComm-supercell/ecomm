import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';
import { CreateNotificationTokenDto } from './dto/create-notification-token.dto';
import { UpdateNotificationTokenDto } from './dto/update-notification-token.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { NotificationTokenEntity } from './entities/notification-token.entity';

@Controller('notification-token')
@ApiTags('Notification Token')
export class NotificationTokenController {
  constructor(
    private readonly notificationTokenService: NotificationTokenService,
  ) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({ type: NotificationTokenEntity })
  create(@Body() createNotificationTokenDto: CreateNotificationTokenDto) {
    return this.notificationTokenService.create(createNotificationTokenDto);
  }

  // @Get()
  // findAll() {
  //   return this.notificationTokenService.findAll();
  // }

  @Get(':id')
  @ApiOkResponse({ type: NotificationTokenEntity })
  findOne(@Param('id') id: string) {
    return this.notificationTokenService.findOne(+id);
  }

  @Patch(':id')
  @apiExceptionResponse()
  @ApiOkResponse({ type: NotificationTokenEntity })
  update(
    @Param('id') id: string,
    @Body() updateNotificationTokenDto: UpdateNotificationTokenDto,
  ) {
    return this.notificationTokenService.update(
      +id,
      updateNotificationTokenDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTokenService.remove(+id);
  }
}
