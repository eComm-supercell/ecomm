import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { AuthController } from './authentication.controller';
import { CustomersAuthService as CustomersAuthService } from './authentication.customers.service';
import { AdminsAuthService as AdminsAuthService } from './authentication.admins.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { UsersModule } from '@libs/common/src/users/users.module';
import { UsersService } from '@libs/common/src/users/users.service';
import { LocalStrategy } from '@libs/common/src/auth/strategy/local.strategy';
import { CustomersPhoneStrategy } from '@libs/common/src/auth/strategy/customers/customers-phone.strategy';
import { JwtStrategy } from '@libs/common/src/auth/strategy/jwt.strategy';
import { JwtQueryStrategy } from '@libs/common/src/auth/strategy/jwtquery.strategy';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';

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
    CustomersPhoneStrategy,
    AdminsAuthService,
    JwtStrategy,
    JwtQueryStrategy,
    CustomersAuthService,
    JwtService,
    UsersService,
  ],
})
export class AuthenticationModule {}
