import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsController } from './assets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ServiceNamesService } from '@libs/common/src/service-names/service-names.service';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'ASSETS',
          useFactory: () => {
            const config = new ConfigService(); // app config service
            const serviceNames = new ServiceNamesService(config); // app service names service (microservices)
            const options = serviceNames.connectToAssetsService(); // get auth microservice options
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
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
