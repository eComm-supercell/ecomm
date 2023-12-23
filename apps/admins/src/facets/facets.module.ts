import { Module } from '@nestjs/common';
import { FacetsController } from './facets.controller';
import { FacetsService } from './facets.service';
import { PrismaModule } from '@libs/common/src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FacetsController],
  providers: [FacetsService],
})
export class FacetsModule {}
