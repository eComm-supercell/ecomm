import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { AdminAuthenticationModule } from './auth/authentication.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNamesService } from '@libs/common/src/service-names/service-names.service';
import { ServiceNamesModule } from '@libs/common/src/service-names/service-names.module';

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
    AdminAuthenticationModule,
  ],
})
export class AdminsModule {}
