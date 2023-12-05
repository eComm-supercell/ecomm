import { Module } from '@nestjs/common';
import { MobileAppConfigService } from './mobile-app-config.service';
import { MobileAppConfigController } from './mobile-app-config.controller';

@Module({
  controllers: [MobileAppConfigController],
  providers: [MobileAppConfigService],
})
export class MobileAppConfigModule {}
