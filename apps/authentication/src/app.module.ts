import { Module } from '@nestjs/common';
import { AuthenticationModule as Auth } from './auth/authentication.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { SeedModule } from '@libs/common/src/scripts/seed/seed.module';
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
    SeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AuthenticationModule {}
