import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductListingService } from './product-listing.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetCollectionsDto } from './dto/get-collections.dto';
import { GetVariant, VariantsOfCollection } from './dto/get-variants.dto';
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
   * While child collections have:
   * - List of translations
   * - Asset (image)
   * @returns
   */
  @Get('collections')
  @apiPaginatedResponse(GetCollectionsDto)
  getCollections(@Query() params: KeysetPaginationDto) {
    return this.productListingService.findAllCollections(params);
  }

  /**
   * Find all product variants inside a collection. Each variant has:
   * - List of translations
   * - Asset (image)
   * - Product it blongs to
   *
   * @param id
   * @returns
   */
  @Get('collection-variants/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Collection ID',
  })
  @apiPaginatedResponse(VariantsOfCollection)
  getCollectionVariants(
    @Param('id') id: string,
    @Query() params: KeysetPaginationDto,
  ) {
    return this.productListingService.findAllCollectionVariants(+id, params);
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
