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
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsQueryDto } from './dto/query.dto';

@Controller('notifications')
@ApiTags('Notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @apiExceptionResponse()
  @ApiCreatedResponse({ type: NotificationEntity })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  // @Get()
  // findAll() {
  //   return this.notificationsService.findAll();
  // }

  /**
   * Query notifications by user ID. It returns a list of notifications that belong to the user.
   *
   */
  @Get('user')
  @ApiOkResponse({ type: NotificationEntity, isArray: true })
  findUserNotifications(@Query() query: NotificationsQueryDto) {
    return this.notificationsService.findUserNotifications(query);
  }

  /**
   * Query notification by ID
   *
   */
  @Get(':id')
  @ApiOkResponse({ type: NotificationEntity })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: NotificationEntity })
  @apiExceptionResponse()
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(+id);
  }
}
