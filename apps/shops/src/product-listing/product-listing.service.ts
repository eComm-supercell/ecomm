import { Injectable } from '@nestjs/common';
import { CreateProductListingDto } from './dto/create-product-listing.dto';
import { UpdateProductListingDto } from './dto/update-product-listing.dto';

@Injectable()
export class ProductListingService {
  create(createProductListingDto: CreateProductListingDto) {
    return 'This action adds a new productListing';
  }

  findAll() {
    return `This action returns all productListing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productListing`;
  }

  update(id: number, updateProductListingDto: UpdateProductListingDto) {
    return `This action updates a #${id} productListing`;
  }

  remove(id: number) {
    return `This action removes a #${id} productListing`;
  }
}
