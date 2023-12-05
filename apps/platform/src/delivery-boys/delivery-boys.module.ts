import { Module } from '@nestjs/common';
import { DeliveryBoysService } from './delivery-boys.service';
import { DeliveryBoysController } from './delivery-boys.controller';

@Module({
  controllers: [DeliveryBoysController],
  providers: [DeliveryBoysService]
})
export class DeliveryBoysModule {}
