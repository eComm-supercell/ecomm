import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { CityModule } from './city/city.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { AuditLogModule } from './audit-log/audit-log.module';
import { SystemConfigModule } from './system-config/system-config.module';
import { ProvinceModule } from './province/province.module';
import { MobileAppConfigModule } from './mobile-app-config/mobile-app-config.module';

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
    CategoryModule,
    CityModule,
    ApiKeyModule,
    PrismaModule,
    AuditLogModule,
    SystemConfigModule,
    ProvinceModule,
    MobileAppConfigModule,
  ],
})
export class AdminsModule {}