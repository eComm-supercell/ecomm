import { Module } from '@nestjs/common';
import { AuthenticationModule as Auth } from './auth/authentication.module';
@Module({
  imports: [Auth],
  controllers: [],
  providers: [],
})
export class AuthenticationModule {}
