import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';

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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class PlatformAuthenticationModule {}
