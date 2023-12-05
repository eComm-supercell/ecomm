import { NestFactory } from '@nestjs/core';
import { AdminsModule } from './admins.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AdminsModule);
  // Config service
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Admins API')
    .setDescription('The Admins API description')
    .setVersion('1.0')
    .addTag('Category')
    .addTag('City')
    .addTag('Api key')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('ADMINS_PORT') || 3002);
}
void bootstrap();
