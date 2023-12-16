import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { CustomersAuthenticationModule } from './auth/authentication.module';
import { ProfileModule } from './profile/profile.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';

@Module({
  imports: [
    CustomersAuthenticationModule,
    PrismaModule,
    SharedAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
    // Connect auth module as a client to auth microservice
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host: SERVICE_NAMES.auth.name,
          port: SERVICE_NAMES.auth.port as any,
        },
      },
    ]),
    ProfileModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
