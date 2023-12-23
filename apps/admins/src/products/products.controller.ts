import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  @apiExceptionResponse()
  async create(@Body() body: CreateProductDto) {
    return this.service.create(body);
  }
}
