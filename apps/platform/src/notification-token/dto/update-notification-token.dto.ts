import { OmitType } from '@nestjs/swagger';
import { CreateNotificationTokenDto } from './create-notification-token.dto';

export class UpdateNotificationTokenDto extends OmitType(
  CreateNotificationTokenDto,
  ['userId'] as const,
) {}
