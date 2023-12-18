import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { AdminAuthenticationModule } from './auth/authentication.module';
import { CollectionsModule } from './collections/collections.module';
import { CollectionTranslationModule } from './collection-translation/collection-translation.module';

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
    AdminAuthenticationModule,
    CollectionsModule,
    CollectionTranslationModule,
  ],
})
export class AdminsModule {}
