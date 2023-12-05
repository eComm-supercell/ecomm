import { Test, TestingModule } from '@nestjs/testing';
import { MobileAppConfigService } from './mobile-app-config.service';

describe('MobileAppConfigService', () => {
  let service: MobileAppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileAppConfigService],
    }).compile();

    service = module.get<MobileAppConfigService>(MobileAppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
