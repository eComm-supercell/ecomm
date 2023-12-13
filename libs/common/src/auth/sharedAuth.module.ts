import { Global, Module } from '@nestjs/common';
import { SharedAuthService } from './sharedAuth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtQueryStrategy } from './strategy/jwtquery.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomersNativeStrategy } from './strategy/customers/customers-native.strategy';
import { CustomersGoogleStrategy } from './strategy/customers/customers-google-oauth.strategy';
import { CustomersNativeJwtStrategy } from './strategy/customers/customers-native-jwt.startegy';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [
    SharedAuthService,
    LocalStrategy,
    JwtStrategy,
    JwtQueryStrategy,
    CustomersNativeStrategy,
    CustomersGoogleStrategy,
    CustomersNativeJwtStrategy,
  ],
  exports: [SharedAuthService, JwtModule],
})
export class SharedAuthModule {}
