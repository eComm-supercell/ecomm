import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { MulterModule } from '@nestjs/platform-express';
import { BullModule } from '@nestjs/bullmq';
import { ImgOptmizerConsumer } from './imgopt-Consumer';
import { multerStorage } from './storage/storage-config';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MulterModule.register(multerStorage),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: 'img-optimization',
    }),
  ],
  controllers: [AttachmentsController],
  providers: [AttachmentsService, ImgOptmizerConsumer],
})
export class AttachmentsModule {}
