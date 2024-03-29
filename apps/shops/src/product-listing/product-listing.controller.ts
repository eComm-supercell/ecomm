import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductListingService } from './product-listing.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  GetCollectionsDto,
  QueryCollectionsParamsDto,
} from './dto/get-collections.dto';
import {
  GetProductById,
  GetVariant,
  ProductsOfCollection,
} from './dto/get-variants.dto';
import { KeysetPaginationDto } from '@libs/common/src/dto/keyset-params-pagination.dto';
import { apiPaginatedResponse } from '@libs/common/src/dto/apiPaginatedResponse.decorator';

@ApiTags('Products Listing')
@Controller('product-listing')
export class ProductListingController {
  constructor(private readonly productListingService: ProductListingService) {}

  /**
   * Get alll collections. Collections are nested in a tree structure. Root collection has:
   *  - List of translations
   *  - Asset (image)
   *  - Nested collections
   *
   * ApiOkResponsed collections have:
   * - List of translations
   * ApiOkResponse
   * @returns
   */
  @Get('collections')
  @apiPaginatedResponse(GetCollectionsDto)
  getCollections(@Query() params: QueryCollectionsParamsDto) {
    return this.productListingService.findAllCollections(params);
  }

  /**
   * Find all products inside a collection. Each product has:
   * - List of translations
   * - Asset (image)
   * - Variants
   * - Collection it belongs to
   * - Option groups (size, color, etc) and option values (small, red, etc)
   *
   *
   *
   * @param id
   * @returns
   */
  @Get('products-of-collection/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Collection ID',
  })
  @apiPaginatedResponse(ProductsOfCollection)
  getCollectionVariants(
    @Param('id') id: string,
    @Query() params: KeysetPaginationDto,
  ) {
    return this.productListingService.findAllCollectionVariants(+id, params);
  }

  /**
   * Find a product by Id. Each product has:
   * - List of translations
   * - Asset (image)
   * - Variants
   * - Collection it belongs to
   * - Option groups (size, color, etc) and option values (small, red, etc)
   *
   *
   *
   * @param id
   * @returns
   */
  @ApiOkResponse({
    type: GetProductById,
  })
  @Get('product/:id')
  getProduct(@Param('id') id: string) {
    return this.productListingService.findProduct(+id);
  }

  /**
   * Find a product variant by id. Each variant has:
   * - List of translations
   * - Asset (image)
   * - Product it blongs to
   *
   * @param id
   * @returns
   */
  @ApiOkResponse({
    type: GetVariant,
  })
  @Get('product-variant/:id')
  getProductVariant(@Param('id') id: string) {
    return this.productListingService.findProductVariant(+id);
  }
}
