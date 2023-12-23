import { Module } from '@nestjs/common';
import { ProductListingService } from './product-listing.service';
import { ProductListingController } from './product-listing.controller';

@Module({
  controllers: [ProductListingController],
  providers: [ProductListingService]
})
export class ProductListingModule {}
