import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './authentication.controller';
import { AuthService } from './authentication.service';
import { PassportModule } from '@nestjs/passport';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { SharedAuthModule } from '@libs/common/src/auth/sharedAuth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceNamesModule } from '@libs/common/src/service-names/service-names.module';
import { ServiceNamesService } from '@libs/common/src/service-names/service-names.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    FirebaseModule,
    PrismaModule,
    SharedAuthModule,
    ServiceNamesModule,
    // Connect auth module as a client to auth microservice
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'AUTHENTICATION',
          useFactory: () => {
            const config = new ConfigService(); // app config service
            const serviceNames = new ServiceNamesService(config); // app service names service (microservices)
            const options = serviceNames.connectToAuthenticationService(); // get auth microservice options
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
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class CustomersAuthenticationModule {}
