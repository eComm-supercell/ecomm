import { OmitType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

export class UpdateNotificationDto extends OmitType(CreateNotificationDto, [
  'userId',
] as const) {}
