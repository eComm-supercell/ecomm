import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';

@Module({
  imports: [
    ConfigModule,
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
    PassportModule,
    FirebaseModule,
    PrismaModule,
    SharedAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class CustomersAuthenticationModule {}
