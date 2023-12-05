import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryBoysService } from './delivery-boys.service';

describe('DeliveryBoysService', () => {
  let service: DeliveryBoysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryBoysService],
    }).compile();

    service = module.get<DeliveryBoysService>(DeliveryBoysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
