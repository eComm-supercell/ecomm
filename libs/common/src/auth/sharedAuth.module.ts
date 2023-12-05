import { Global, Module } from '@nestjs/common';
import { SharedAuthService } from './sharedAuth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { CustomersPhoneStrategy } from './strategy/customers-phone.strategy';
import { JwtQueryStrategy } from './strategy/jwtquery.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    SharedAuthService,
    LocalStrategy,
    JwtStrategy,
    CustomersPhoneStrategy,
    JwtQueryStrategy,
  ],
  exports: [SharedAuthService, JwtModule],
})
export class SharedAuthModule {}
