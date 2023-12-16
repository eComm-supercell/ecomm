import { Module } from '@nestjs/common';
import { ServiceNamesService } from './service-names.service';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
  ],
  providers: [ServiceNamesService],
})
export class ServiceNamesModule {}
