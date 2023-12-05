import { Module } from '@nestjs/common';
import { MilisearchService } from './milisearch.service';
import { MilisearchController } from './milisearch.controller';

@Module({
  controllers: [MilisearchController],
  providers: [MilisearchService],
})
export class MilisearchModule {}
