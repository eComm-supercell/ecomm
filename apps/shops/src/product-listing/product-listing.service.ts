import { KeysetPaginationDto } from '@libs/common/src/dto/keyset-params-pagination.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { QueryCollectionsParamsDto } from './dto/get-collections.dto';

@Injectable()
export class ProductListingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all `ROOT` collections without any child sub-collections. Collections are nested in a tree structure. A typicall collection has:
   * - List of translations
   * - Asset (image)
   * - Nested collections
   *
   * @param params
   * @returns
   */
  async findRootCollections(params: QueryCollectionsParamsDto) {
    const { offset, limit, startingId } = params;
    const [count, items] = await this.prisma.$transaction([
      this.prisma.collection.count(),
      this.prisma.collection.findMany({
        take: limit ? +limit : undefined,
        skip: offset ? +offset : undefined,
        cursor: startingId ? { id: +startingId } : { id: 1 },
        select: {
          featuredAssetId: false,
          createdAt: false,
          updatedAt: false,
          isPrivate: true,
          id: true,
          parentCollectionId: true,
          asset: {
            select: {
              source: true,
              preview: true,
              mimeType: true,
              name: true,
              width: true,
              height: true,
              id: true,
            },
          },
          collection_translation: {
            select: {
              createdAt: false,
              updatedAt: false,
              name: true,
              description: true,
              languageCode: true,
              slug: true,
              id: true,
            },
          },
        },
        where: {
          parentCollectionId: null,
        },
      }),
    ]);

    return { count, results: items };
  }
  /**
   * Get all collections including nested collections. Collections are nested in a tree structure. A typicall collection has:
   * - List of translations
   * - Asset (image)
   * - Nested collections
   * @param params
   * @returns
   */
  async findAllCollections(params: QueryCollectionsParamsDto) {
    const { offset, limit, startingId, children } = params;

    // Find root collections only
    if (!children) {
      return await this.findRootCollections(params);
    } else {
      // Find collections with children
      const [count, items] = await this.prisma.$transaction([
        this.prisma.collection.count(),
        this.prisma.collection.findMany({
          take: limit ? +limit : undefined,
          skip: offset ? +offset : undefined,
          cursor: startingId ? { id: +startingId } : { id: 1 },
          select: {
            featuredAssetId: false,
            createdAt: false,
            updatedAt: false,
            isPrivate: true,
            id: true,
            parentCollectionId: true,
            asset: {
              select: {
                source: true,
                preview: true,
                mimeType: true,
                name: true,
                width: true,
                height: true,
                id: true,
              },
            },
            collection_translation: {
              select: {
                createdAt: false,
                updatedAt: false,
                name: true,
                description: true,
                languageCode: true,
                slug: true,
                id: true,
              },
            },
            nestedCollections: {
              select: {
                isPrivate: true,
                id: true,
                parentCollectionId: true,
                asset: {
                  select: {
                    source: true,
                    preview: true,
                    mimeType: true,
                    name: true,
                    width: true,
                    height: true,
                    id: true,
                  },
                },
                collection_translation: {
                  select: {
                    createdAt: false,
                    updatedAt: false,
                    name: true,
                    description: true,
                    languageCode: true,
                    slug: true,
                    id: true,
                  },
                },
              },
            },
            parentCollection: {
              select: {
                id: true,
                asset: {
                  select: {
                    source: true,
                    preview: true,
                    mimeType: true,
                    name: true,
                    width: true,
                    height: true,
                  },
                },
                collection_translation: {
                  select: {
                    createdAt: false,
                    updatedAt: false,
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      return { count, results: items };
    }
  }

  async findAllCollectionVariants(
    collectionId: number,
    params: KeysetPaginationDto,
  ) {
    const { offset, limit, startingId } = params;
    const [count, items] = await this.prisma.$transaction([
      this.prisma.collection.count(),
      this.prisma.product_variant.findMany({
        skip: offset ? +offset : undefined,
        take: limit ? +limit : undefined,
        cursor: startingId ? { id: +startingId } : { id: 1 },
        where: {
          collections: {
            every: {
              collectionId: {
                equals: collectionId,
              },
            },
          },
        },
        select: {
          createdAt: false,
          updatedAt: false,
          deletedAt: false,
          enabled: false,
          sku: false,
          outOfStockThreshold: false,
          useGlobalOutOfStockThreshold: false,
          trackInventory: false,
          id: false,
          assetId: false,
          productId: false,
          product: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              translations: true,
              enabled: true,
              asset: {
                select: {
                  source: true,
                  preview: true,
                  mimeType: true,
                  name: true,
                  width: true,
                  height: true,
                  id: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return { count, results: items };
  }

  async findProductVariant(variantId: number) {
    return await this.prisma.product_variant.findFirst({
      where: {
        id: variantId,
      },
      include: {
        translations: true,
        asset: {
          select: {
            preview: true,
            source: true,
          },
        },
        price: true,
        productVariantAssets: true,
        product: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findProduct(productId: number) {
    const [variantsCount, product] = await this.prisma.$transaction([
      this.prisma.product_variant.count({
        where: {
          product: {
            id: productId,
          },
        },
      }),
      this.prisma.product.findFirst({
        where: {
          id: productId,
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          translations: true,
          enabled: true,
          asset: {
            select: {
              source: true,
              preview: true,
              mimeType: true,
              name: true,
              width: true,
              height: true,
              id: true,
            },
          },
          optionsGroup: {
            select: {
              id: true,
              translations: true,
              productOptions: {
                select: {
                  code: true,
                  id: true,
                  translations: true,
                },
              },
            },
          },
        },
      }),
    ]);

    return { variantsCount, product };
  }
}
