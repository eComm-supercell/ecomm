import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    FirebaseModule,
    PrismaModule,
    SharedAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class CustomersAuthenticationModule {}
