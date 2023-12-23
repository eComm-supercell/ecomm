import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SeedService } from '@libs/common/src/scripts/seed/seed.service';
import { AuthenticationModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthenticationModule, {
    transport: Transport.TCP,
    name: 'AUTHENTICATION',
    options: {
      port: 4000,
      host: process.env.NODE_ENV === 'development' ? 'localhost' : 'auth',
    },
  });

  const configService = app.get<ConfigService>(ConfigService);
  console.log(
    'Authentication is running on port',
    configService.get('AUTHENTICATION_PORT'),
    'env test',
  );

  // Seed the database
  const seed = app.get<SeedService>(SeedService);
  await seed.seed();
  await app.listen();
}
void bootstrap();
