import { Test, TestingModule } from '@nestjs/testing';
import { MilisearchService } from './milisearch.service';

describe('MilisearchService', () => {
  let service: MilisearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MilisearchService],
    }).compile();

    service = module.get<MilisearchService>(MilisearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
