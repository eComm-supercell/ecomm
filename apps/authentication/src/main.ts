import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './app.module';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    name: SERVICE_NAMES.auth.name,
    options: {
      port: SERVICE_NAMES.auth.port,
      host: SERVICE_NAMES.auth.name,
    },
  });

  const configService = app.get<ConfigService>(ConfigService);
  console.log(
    'Authentication is running on port',
    configService.get('AUTHENTICATION_PORT'),
    'env test',
  );

  await app.listen();
}
void bootstrap();
