import { Module } from '@nestjs/common';
import { AuthenticationModule as Auth } from './auth/authentication.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
@Module({
  imports: [
    Auth,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AuthenticationModule {}
