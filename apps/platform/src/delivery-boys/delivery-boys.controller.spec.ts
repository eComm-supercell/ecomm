import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryBoysController } from './delivery-boys.controller';
import { DeliveryBoysService } from './delivery-boys.service';

describe('DeliveryBoysController', () => {
  let controller: DeliveryBoysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryBoysController],
      providers: [DeliveryBoysService],
    }).compile();

    controller = module.get<DeliveryBoysController>(DeliveryBoysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
