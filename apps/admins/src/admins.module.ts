import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
import { AdminAuthenticationModule } from './auth/authentication.module';

@Module({
  imports: [
    ClientsModule.register([
      // Connect platform public service as a client to auth microservice
      {
        name: SERVICE_NAMES.auth.name,
        transport: Transport.TCP,
        options: {
          host: SERVICE_NAMES.auth.name,
          port: parseInt(SERVICE_NAMES.auth.port as string) as number,
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
    AdminAuthenticationModule,
  ],
})
export class AdminsModule {}
