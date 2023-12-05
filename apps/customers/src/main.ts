import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  // Config service
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Customers API')
    .setDescription('The Customers API description')
    .setVersion('1.0')
    .addTag('Customers')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('CUSTOMERS_PORT') || 3001);
}
void bootstrap();
