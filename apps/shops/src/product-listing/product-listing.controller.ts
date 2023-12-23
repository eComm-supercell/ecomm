import { Controller, Get, Param } from '@nestjs/common';
import { ProductListingService } from './product-listing.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetCollectionsDto } from './dto/get-collections.dto';
import { GetVariant, VariantsOfCollection } from './dto/get-variants.dto';

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
  @ApiOkResponse({
    type: GetCollectionsDto,
    isArray: true,
  })
  getCollections() {
    return this.productListingService.findAllCollections();
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
  @ApiOkResponse({
    type: VariantsOfCollection,
    isArray: true,
  })
  getCollectionVariants(@Param('id') id: string) {
    return this.productListingService.findAllCollectionVariants(+id);
  }

  @ApiOkResponse({
    type: GetVariant,
  })
  @Get('product-variant/:id')
  getProductVariant(@Param('id') id: string) {
    return this.productListingService.findProductVariant(+id);
  }
}
