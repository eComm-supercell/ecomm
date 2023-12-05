import { Module } from '@nestjs/common';
import { NotificationTokenService } from './notification-token.service';
import { NotificationTokenController } from './notification-token.controller';

@Module({
  controllers: [NotificationTokenController],
  providers: [NotificationTokenService],
})
export class NotificationTokenModule {}
