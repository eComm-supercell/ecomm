import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppExceptionFilter } from '@libs/common/src/exceptions/custom-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  // Add global exception filter
  // Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());
  // Config service
  const configService = app.get<ConfigService>(ConfigService);
  console.log('Shops PORT HERE', configService.get('SHOPS_PORT'));

  const config = new DocumentBuilder()
    .setTitle('Shops API')
    .setDescription('Shops API description.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('Customer Profile')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('SHOPS_PORT') || 3001, () => {
    console.log(
      `Shops API is running on: ${configService.get('SHOPS_PORT') || 3001}`,
    );
  });
}
void bootstrap();
