import { Module } from '@nestjs/common';
import path from 'path';
import { ConfigModule } from '@nestjs/config';
// import { AttachmentsModule } from './attachments/attachments.module';
// import { MilisearchModule } from './milisearch/milisearch.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { ServiceNamesModule } from '@libs/common/src/service-names/service-names.module';
import { ServiceNamesService } from '@libs/common/src/service-names/service-names.service';

@Module({
  imports: [
    ServiceNamesModule,
    // Connect auth module as a client to auth microservice
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'AUTHENTICATION',
          useFactory: (serviceNames: ServiceNamesService) => {
            const options = serviceNames.connectToAuthenticationService();
            return {
              transport: Transport.TCP,
              options: {
                host: options.name,
                port: options.port,
              },
            };
          },
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? path.join(process.cwd(), '.env.dev')
          : path.join(process.cwd(), '.env.prod'),
      ],
    }),

    // AttachmentsModule,
    // MilisearchModule,
    SharedAuthModule,
  ],
})
export class AppModule {}
