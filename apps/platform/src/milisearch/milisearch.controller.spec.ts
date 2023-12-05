import { Test, TestingModule } from '@nestjs/testing';
import { MilisearchController } from './milisearch.controller';
import { MilisearchService } from './milisearch.service';

describe('MilisearchController', () => {
  let controller: MilisearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilisearchController],
      providers: [MilisearchService],
    }).compile();

    controller = module.get<MilisearchController>(MilisearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
