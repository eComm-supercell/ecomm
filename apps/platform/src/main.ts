import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppExceptionFilter } from '@libs/common/src/exceptions/custom-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  // Config service
  const configService = app.get<ConfigService>(ConfigService);

  // Add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Add global exception filter
  app.useGlobalFilters(new AppExceptionFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Address')
    .addTag('Wallet')
    .addTag('Wallet Transaction')
    .addTag('products')
    .addTag('Shops')
    .addTag('Profile')
    .addTag('Tags')
    .addTag('Notifications')
    .addTag('Notification Token')
    .addTag('User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start app
  await app.listen(configService.get<number>('PLATFORM_PORT') || 3000, () => {
    console.log('Platform service is running on port 3000');
  });
}
void bootstrap();
