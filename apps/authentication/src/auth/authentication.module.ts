import { Module } from '@nestjs/common';
import { AuthController } from './authentication.controller';
import { CustomersAuthService as CustomersAuthService } from './authentication.customers.service';
import { AdminsAuthService as AdminsAuthService } from './authentication.admins.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { UsersModule } from '@libs/common/src/users/users.module';
import { SharedUsersService } from '@libs/common/src/users/users.service';
import { LocalStrategy } from '@libs/common/src/auth/strategy/local.strategy';
import { JwtStrategy } from '@libs/common/src/auth/strategy/jwt.strategy';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    FirebaseModule,
    UsersModule,
    PrismaModule,
    SharedAuthModule,
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    AdminsAuthService,
    JwtStrategy,
    CustomersAuthService,
    JwtService,
    SharedUsersService,
  ],
})
export class AuthenticationModule {}
