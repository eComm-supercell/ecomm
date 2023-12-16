import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { CustomersAuthenticationModule } from './auth/authentication.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    CustomersAuthenticationModule,
    PrismaModule,
    SharedAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),
    ProfileModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
