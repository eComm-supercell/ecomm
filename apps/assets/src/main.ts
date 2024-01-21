import { NestFactory } from '@nestjs/core';
import { AssetsModule } from './assets.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AssetsModule, {
    transport: Transport.TCP,
    name: 'ASSETS',
    options: {
      port: 5000,
      host: process.env.NODE_ENV === 'development' ? 'localhost' : 'assets',
    },
  });
  const configService = app.get<ConfigService>(ConfigService);
  console.log(
    'Assets is running on port',
    configService.get('ASSETS_PORT'),
    'env test',
  );
  await app.listen();
}
void bootstrap();
