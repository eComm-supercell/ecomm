import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppExceptionFilter } from '@libs/common/src/exceptions/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  // Add global exception filter
  app.useGlobalFilters(new AppExceptionFilter());
  // Config service
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Shops API')
    .setDescription('Shops API description.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication')
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
