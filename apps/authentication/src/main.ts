import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthenticationModule } from './app.module';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    name: SERVICE_NAMES.auth.name,
    options: {
      port: SERVICE_NAMES.auth.port,
      host: SERVICE_NAMES.auth.name,
    },
  });
  await app.listen();
}
void bootstrap();
