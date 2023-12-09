import { Controller, Get, Param } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/getAll')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('/getProduct:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('/fake')
  procesFakeData() {
    return this.productsService.procesFakeData();
  }
}
