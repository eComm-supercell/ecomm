import { Module } from '@nestjs/common';
import { CollectionTranslationService } from './collection-translation.service';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';
import { CollectionTranslationController } from './collection-translation.controller';

@Module({
  imports: [PrismaModule],
  providers: [CollectionTranslationService],
  controllers: [CollectionTranslationController],
})
export class CollectionTranslationModule {}
