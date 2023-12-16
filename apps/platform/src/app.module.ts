import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule } from '@nestjs/config';
// import { AttachmentsModule } from './attachments/attachments.module';
// import { MilisearchModule } from './milisearch/milisearch.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
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
    ClientsModule.register([
      // Connect platform public service as a client to auth microservice
      {
        name: SERVICE_NAMES.auth.name,
        transport: Transport.TCP,
        options: {
          host: SERVICE_NAMES.auth.name,
          port: parseInt(SERVICE_NAMES.auth.port as string) as number,
        },
      },
    ]),
    // AttachmentsModule,
    // MilisearchModule,
    SharedAuthModule,
  ],
})
export class AppModule {}
