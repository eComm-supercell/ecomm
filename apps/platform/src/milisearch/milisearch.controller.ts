import { Controller } from '@nestjs/common';
import { MilisearchService } from './milisearch.service';

@Controller('milisearch')
export class MilisearchController {
  constructor(private readonly milisearchService: MilisearchService) {}
}
