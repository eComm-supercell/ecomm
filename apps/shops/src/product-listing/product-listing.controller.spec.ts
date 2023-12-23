import { Test, TestingModule } from '@nestjs/testing';
import { ProductListingController } from './product-listing.controller';
import { ProductListingService } from './product-listing.service';

describe('ProductListingController', () => {
  let controller: ProductListingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductListingController],
      providers: [ProductListingService],
    }).compile();

    controller = module.get<ProductListingController>(ProductListingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
