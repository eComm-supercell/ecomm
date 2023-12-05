import { Test, TestingModule } from '@nestjs/testing';
import { MobileAppConfigController } from './mobile-app-config.controller';
import { MobileAppConfigService } from './mobile-app-config.service';

describe('MobileAppConfigController', () => {
  let controller: MobileAppConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileAppConfigController],
      providers: [MobileAppConfigService],
    }).compile();

    controller = module.get<MobileAppConfigController>(MobileAppConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
