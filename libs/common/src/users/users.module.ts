import { Global, Module } from '@nestjs/common';
import { SharedUsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { FirebaseModule } from '../firebase/firebase.module';
import { SharedAuthModule } from '../auth/sharedAuth.module';

@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    FirebaseModule,
    SharedAuthModule,
  ],
  providers: [SharedUsersService],
  exports: [SharedUsersService, JwtModule],
})
export class UsersModule {}
