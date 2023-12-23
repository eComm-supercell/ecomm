import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductListingService {
  constructor(private prisma: PrismaService) {}

  async findAllCollections() {
    return await this.prisma.collection.findFirst({
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
    });
  }

  async findAllCollectionVariants(collectionId: number) {
    return await this.prisma.product_variant.findMany({
      where: {
        collections: {
          every: {
            collectionId: {
              equals: collectionId,
            },
          },
        },
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
}
