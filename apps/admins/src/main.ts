import { NestFactory } from '@nestjs/core';
import { AdminsModule } from './admins.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppExceptionFilter } from '@libs/common/src/exceptions/custom-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminsModule);
  // Add global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Add global exception filter
  app.useGlobalFilters(new AppExceptionFilter());
  // Config service
  const configService = app.get<ConfigService>(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('Admins API')
    .setDescription('The Admins API description')
    .setVersion('1.0')
    .addTag(
      'Collections',
      'E-commerce collections are curated groups of related products, enhancing the shopping experience. Collections aid navigation, presenting products in organized themes. They are curated for visual appeal, facilitating quick exploration, and offer promotional opportunities. Improve user experience with structured and themed product groupings.',
    )
    .addTag(
      'Collections Translation',
      'The Collection translation contains the textual information like Name, Description and Slug. Each Collcetion MUST indeed have this information and Collection translation is where we keept it.',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('ADMINS_PORT') || 3002);
}
void bootstrap();
