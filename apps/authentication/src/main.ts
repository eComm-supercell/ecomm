import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { SeedService } from '@libs/common/src/scripts/seed/seed.service';
import { AuthenticationModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';

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

  const seed = app.get<SeedService>(SeedService);
  if (process.env.NODE_ENV === 'production') {
    console.log('Running Seed strategy in production mode');
    await seed.clean(); // clean DB
    exec('npx prisma migrate deploy', async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      await seed.seed();
      await app.listen();
    });
  } else {
    console.log('Running in development mode: NO SEED');
    await app.listen();
  }
}
void bootstrap();
