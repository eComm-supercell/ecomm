import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductListingService } from './product-listing.service';
import { CreateProductListingDto } from './dto/create-product-listing.dto';
import { UpdateProductListingDto } from './dto/update-product-listing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products Listing')
@Controller('product-listing')
export class ProductListingController {
  constructor(private readonly productListingService: ProductListingService) {}

  @Post()
  create(@Body() createProductListingDto: CreateProductListingDto) {
    return this.productListingService.create(createProductListingDto);
  }

  @Get()
  findAll() {
    return this.productListingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productListingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductListingDto: UpdateProductListingDto,
  ) {
    return this.productListingService.update(+id, updateProductListingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productListingService.remove(+id);
  }
}
