import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CurrencyCode,
  LanguageCode,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { faker } from '@faker-js/faker';
import {
  CreateProductDto,
  CreateProductOptionDto,
  CreateProductOptionGroupTranslationDto,
  ProductOptionGroup,
} from '@app/admins/src/products/dto/create-product.dto';
import { DefaultArgs } from '@prisma/client/runtime/library';

export interface IFace {
  facet: {
    isPrivate: boolean;
    code: string;
    translations: { languageCode: 'en' | 'ar'; name: string }[];
  };
  values: {
    code: string;
    translations: { languageCode: 'en' | 'ar'; name: string }[];
  }[];
}
@Injectable()
export class SeedService {
  constructor(private readonly prisma: PrismaService) {}
  fakeasset(n: number) {
    const list: any[] = [];
    for (let index = 0; index < n; index++) {
      list.push({
        name: faker.commerce.productName(),
        type: 'image',
        mimeType: faker.helpers.arrayElement([
          'image/jpeg',
          'image/png',
          'image/gif',
          'icon/svg+xml',
        ] as const),
        fileSize: 500,
        width: 200,
        height: 200,
        source: faker.image.url({ width: 200, height: 200 }),
        preview: faker.image.url({ width: 200, height: 200 }),
      });
    }
    return list;
  }

  collectionsList() {
    const collections = [
      {
        isPrivate: false,
        parentCollectionId: undefined,
        featuredAssetId: undefined,
        translation: {
          languageCode: 'en',
          name: 'Electronics',
          slug: 'electronics',
          description: 'Explore the latest electronic gadgets and devices.',
        },
        childCollections: [
          {
            isPrivate: false,
            parentCollectionId: 1,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Smartphones',
              slug: 'smartphones',
              description: 'Discover the latest smartphones and accessories.',
            },
          },
          {
            isPrivate: false,
            parentCollectionId: 1,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Laptops',
              slug: 'laptops',
              description: 'Find powerful laptops for work and entertainment.',
            },
          },
        ],
      },
      {
        isPrivate: false,
        parentCollectionId: undefined,
        featuredAssetId: undefined,
        translation: {
          languageCode: 'en',
          name: 'Clothing',
          slug: 'clothing',
          description: 'Discover trendy and fashionable clothing items.',
        },
        childCollections: [
          {
            isPrivate: false,
            parentCollectionId: 4,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: "Men's Fashion",
              slug: 'mens-fashion',
              description: "Explore the latest trends in men's fashion.",
            },
          },
          {
            isPrivate: false,
            parentCollectionId: 4,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: "Women's Fashion",
              slug: 'womens-fashion',
              description: "Shop for stylish women's fashion items.",
            },
          },
        ],
      },
      {
        isPrivate: false,
        parentCollectionId: undefined,
        featuredAssetId: undefined,
        translation: {
          languageCode: 'en',
          name: 'Exclusive Deals',
          slug: 'exclusive-deals',
          description: 'Unlock special offers and exclusive deals for members.',
        },
        childCollections: [],
      },
      {
        isPrivate: false,
        parentCollectionId: undefined,
        featuredAssetId: undefined,
        translation: {
          languageCode: 'en',
          name: 'Home and Living',
          slug: 'home-and-living',
          description:
            'Find stylish and comfortable home decor and furnishings.',
        },
        childCollections: [
          {
            isPrivate: false,
            parentCollectionId: 8,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Bedroom Essentials',
              slug: 'bedroom-essentials',
              description: 'Create a cozy and inviting bedroom space.',
            },
          },
          {
            isPrivate: false,
            parentCollectionId: 8,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Kitchen Gadgets',
              slug: 'kitchen-gadgets',
              description: 'Discover innovative kitchen gadgets and tools.',
            },
          },
        ],
      },
      {
        isPrivate: false,
        parentCollectionId: undefined,
        featuredAssetId: undefined,
        translation: {
          languageCode: 'en',
          name: 'Outdoor Gear',
          slug: 'outdoor-gear',
          description:
            'Gear up for your outdoor adventures with top-quality equipment.',
        },
        childCollections: [
          {
            isPrivate: false,
            parentCollectionId: 11,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Camping Essentials',
              slug: 'camping-essentials',
              description: 'Get ready for a camping trip with essential gear.',
            },
          },
          {
            isPrivate: false,
            parentCollectionId: 11,
            featuredAssetId: undefined,
            translation: {
              languageCode: 'en',
              name: 'Hiking Gear',
              slug: 'hiking-gear',
              description: 'Explore durable and comfortable hiking gear.',
            },
          },
        ],
      },
    ];
    return collections;
  }
  generateFacets(): IFace[] {
    // Generate unique codes for electronics and clothing
    const electronicsCode = 'electronics';
    const clothingCode = 'clothing';

    // Generate unique codes for facet values
    const smartphoneCode = 'smartphone';
    const laptopCode = 'laptop';
    const tshirtCode = 'tshirt';
    const jeansCode = 'jeans';

    // Generate facet values for electronics
    const electronicsFacet: IFace = {
      facet: {
        isPrivate: false,
        code: electronicsCode,
        translations: [
          { languageCode: 'en', name: 'Electronics' },
          { languageCode: 'ar', name: 'الإلكترونيات' },
        ],
      },
      values: [
        {
          code: smartphoneCode,
          translations: [
            { languageCode: 'en', name: 'Smartphone' },
            { languageCode: 'ar', name: 'الهاتف الذكي' },
          ],
        },
        {
          code: laptopCode,
          translations: [
            { languageCode: 'en', name: 'Laptop' },
            { languageCode: 'ar', name: 'حاسوب محمول' },
          ],
        },
      ],
    };

    // Generate facet values for clothing
    const clothingFacet: IFace = {
      facet: {
        isPrivate: false,
        code: clothingCode,
        translations: [
          { languageCode: 'en', name: 'Clothing' },
          { languageCode: 'ar', name: 'الملابس' },
        ],
      },
      values: [
        {
          code: tshirtCode,
          translations: [
            { languageCode: 'en', name: 'T-Shirt' },
            { languageCode: 'ar', name: 'قميص' },
          ],
        },
        {
          code: jeansCode,
          translations: [
            { languageCode: 'en', name: 'Jeans' },
            { languageCode: 'ar', name: 'جينز' },
          ],
        },
      ],
    };

    return [electronicsFacet, clothingFacet];
  }
  combination(collection, n) {
    let array = _.values(collection);
    if (array.length < n) {
      return [];
    }
    let recur = (array: any, n: number) => {
      if (--n < 0) {
        return [[]];
      }
      let combinations = [];
      array = array.slice();
      while (array.length - n) {
        let value = array.shift();
        recur(array, n).forEach((combination) => {
          combination.unshift(value as never);
          combinations.push(combination as never);
        });
      }
      return combinations;
    };
    return recur(array, n);
  }
  async createOptionGroup(
    translations: CreateProductOptionGroupTranslationDto[],
    options: CreateProductOptionDto[],
    productId: number,
    code: string,
    client: any,
  ) {
    const v = await client.product_option_group.create({
      data: {
        translations: {
          createMany: {
            data: translations.map((translation) => ({
              ...translation,
            })),
          },
        },
        productOptions: {
          create: options.map(
            ({ code: optionCode, translations: optionTrans }) => ({
              code: optionCode,
              translations: {
                createMany: {
                  data: optionTrans.map((translation) => ({
                    ...translation,
                  })),
                },
              },
            }),
          ),
        },
        product: {
          connect: {
            id: productId,
          },
        },
        code,
      },
      include: {
        productOptions: true,
        translations: true,
      },
    });

    return v;
  }
  buildProductVariantsSkeleton(optionGroups: ProductOptionGroup[]) {
    const allOptions = optionGroups
      .map((group) => group.productOptions)
      .map((options) => options.map((option) => option));
    const dirty: any[] = this.combination(
      _.flatten(allOptions),
      optionGroups.length,
    );

    // Remove duplicate and malformed combinations
    // for example if options are color, size and storage, the combination [color, size, color] is not valid
    const clean: any[] = [];
    for (let index = 0; index < dirty.length; index++) {
      const toPush = dirty[index];
      const temp: number[] = [];

      for (let j = 0; j < dirty[index].length; j++) {
        temp.push(dirty[index][j].productOptiongroupId);
      }

      if (_.uniq(temp).length === optionGroups.length) {
        clean.push(toPush);
      }
    }

    // array of arrays of options and each option has a productOptiongroupId
    return clean;
  }
  async createProduct(
    body: CreateProductDto,
    client: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  ) {
    const {
      translations,
      enabled,
      productFacetValues,
      productOptionGroup,
      productVariants,
    } = body;

    const productAssetsIds = [
      faker.number.int({ min: 1, max: 99 }),
      faker.number.int({ min: 1, max: 99 }),
    ];

    const productVariantsAssetsIds = [
      faker.number.int({ min: 1, max: 99 }),
      faker.number.int({ min: 1, max: 99 }),
    ];

    // Create product (translations, facets)
    const { id: productId } = await client.product.create({
      data: {
        enabled,
        translations: {
          createMany: {
            data: translations.map((translation) => ({
              ...translation,
            })),
            skipDuplicates: true,
          },
        },
        facets: {
          create: productFacetValues?.map((facetId: number) => ({
            facet_value: {
              connect: {
                id: facetId,
              },
            },
          })),
        },
        productAssets: {
          create: productAssetsIds.map((assetId) => ({
            asset: {
              connect: {
                id: assetId,
              },
            },
            position: faker.number.int({ min: 1, max: 10 }),
          })),
        },
        asset: {
          connect: {
            id: productAssetsIds[0],
          },
        },
      },
      select: { id: true },
    });

    /**
     * Create product option groups
     */

    // hold data in response object for later use
    const response: {
      optionGroups: ProductOptionGroup[];
      length: number;
      productId: number;
    } = {
      optionGroups: [],
      length: 0,
      productId,
    };

    // Create product option groups
    for (let i = 0; i < productOptionGroup.length; i++) {
      const { code, options, translations: groupTrans } = productOptionGroup[i];

      // Create ONE product option group
      const newGroup: ProductOptionGroup = await this.createOptionGroup(
        groupTrans,
        options,
        productId,
        code,
        client,
      );
      // Update response object
      response.optionGroups.push(newGroup);
      response.length = response.length + 1;
    }

    // Create product variants skeletons (So that variants are created with the correct options)
    const productVariantsSkeletonList = this.buildProductVariantsSkeleton(
      response.optionGroups,
    );

    // Create product variants using the skeletons + variants DTO
    return await client.product.update({
      where: {
        id: productId,
      },
      data: {
        variants: {
          create: productVariantsSkeletonList.map((variant, index: number) => ({
            // from DTO
            enabled: productVariants[index].enabled,
            outOfStockThreshold: productVariants[index].outOfStockThreshold,
            sku: productVariants[index].sku,
            trackInventory: productVariants[index].trackInventory,
            useGlobalOutOfStockThreshold:
              productVariants[index].useGlobalOutOfStockThreshold,
            price: {
              createMany: {
                data: {
                  price: productVariants[index].price,
                  currencyCode: productVariants[index].currencyCode,
                },
              },
            },
            collections: {
              create: productVariants[index].productVariantCollections?.map(
                (collectionID: number) => ({
                  collection: {
                    connect: {
                      id: collectionID,
                    },
                  },
                }),
              ),
            },
            translations: {
              createMany: {
                data: [
                  {
                    languageCode: 'en',
                    name: variant.map((v) => v.code).join(' '),
                  },
                ],
              },
            },
            options: {
              create: variant.map((v) => ({
                product_option: {
                  connect: {
                    id: v.id,
                  },
                },
              })),
            },
            facetValues: {
              create: productFacetValues?.map((facetId: number) => ({
                facet_value: {
                  connect: {
                    id: facetId,
                  },
                },
              })),
            },
            asset: {
              connect: {
                id: productVariantsAssetsIds[0],
              },
            },
            productVariantAssets: {
              create: productVariantsAssetsIds.map((assetId) => ({
                asset: {
                  connect: {
                    id: assetId,
                  },
                },
                position: faker.number.int({ min: 1, max: 10 }),
              })),
            },
          })),
        },
        optionsGroup: {
          connect: response.optionGroups.map(({ id }) => ({
            id,
          })),
        },
      },
      include: {
        optionsGroup: {
          include: {
            productOptions: true,
          },
        },
        variants: {
          include: {
            translations: true,
            price: true,
            options: true,
            facetValues: true,
            collections: {
              select: {
                collection: {
                  select: {
                    collection_translation: {
                      select: {
                        name: true,
                        id: true,
                      },
                    },
                    nestedCollections: {
                      select: {
                        id: true,
                        collection_translation: true,
                      },
                    },
                    parentCollection: {
                      select: {
                        id: true,
                        collection_translation: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        translations: true,
        facets: {
          include: {
            facet_value: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
  }
  createProductsBulk(
    client: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    n: 100,
  ) {
    const test: CreateProductDto[] = [];
    for (let index = 0; index < n; index++) {
      test.push({
        enabled: true,
        translations: [
          {
            description: faker.commerce.productDescription(),
            languageCode: faker.helpers.arrayElement(['en', 'ar'] as const),
            name: faker.commerce.productName(),
            slug: faker.helpers.slugify(faker.commerce.productName()),
          },
        ],
        productOptionGroup: [
          {
            code: faker.helpers.arrayElement(['SIZE', 'COLOR'] as const),
            translations: [
              {
                name: faker.helpers.slugify(
                  faker.helpers.arrayElement(['SIZE', 'COLOR'] as const),
                ),
                languageCode: 'en',
              },
            ],
            options: [
              {
                code: '',
                translations: [
                  {
                    name: 'coltest',
                    languageCode: 'en',
                  },
                ],
              },
            ],
          },
        ],
        productFacetValues: [faker.number.int({ min: 1, max: 2 })],
        productVariants: [
          {
            enabled: true,
            outOfStockThreshold: 10,
            sku: `SKU-${faker.number.int({ max: 100000, min: 0 })}`,
            trackInventory: 'YES',
            useGlobalOutOfStockThreshold: true,
            price: faker.number.int({ min: 1, max: 3000 }),
            currencyCode: CurrencyCode.USD,
            productVariantFacetValues: [faker.number.int({ min: 1, max: 2 })],
            productVariantCollections: [faker.number.int({ min: 1, max: 5 })],
          },
        ],
      });
    }

    test.forEach(async (product) => await this.createProduct(product, client));
    console.log('Products created');
  }
  async seed() {
    console.log('SEED: starting seed from AUTH service main.ts file');

    // Create assets if not exist
    const assetsCount = await this.prisma.asset.count();
    if (assetsCount === 0) {
      console.log('Creating assets...');

      await this.prisma.asset.createMany({
        data: this.fakeasset(100).map((asset) => ({
          ...asset,
        })),
      });
      console.log('Assets created');
    }

    // create facets
    const facetsCount = await this.prisma.facet.count();
    if (facetsCount === 0) {
      console.log('Creating facets...');
      this.generateFacets().forEach(async ({ facet, values }) => {
        await this.prisma.facet.create({
          data: {
            code: facet.code,
            isPrivate: facet.isPrivate,
            translations: {
              create: facet.translations.map((translation) => ({
                ...translation,
              })),
            },
            facetValues: {
              create: values.map((value) => ({
                code: value.code,
                translations: {
                  create: value.translations.map((translation) => ({
                    ...translation,
                  })),
                },
              })),
            },
          },
        });
      });
      console.log('Facets created');
    }

    // create collections
    const collectionCount = await this.prisma.collection.count();
    if (collectionCount === 0) {
      console.log('Creating collections...');
      this.collectionsList().forEach(async (collection) => {
        const { isPrivate, translation, childCollections } = collection;
        const rootTransId = await this.prisma.collection_translation.create({
          data: {
            description: translation.description,
            languageCode: translation.languageCode as LanguageCode,
            name: translation.name,
            slug: translation.slug,
          },
          select: { id: true },
        });
        const parentCollection = await this.prisma.collection.create({
          data: {
            collection_translation: {
              connect: { id: rootTransId.id },
            },
            isPrivate,
            asset: {
              connect: {
                id: faker.number.int({ min: 1, max: 100 }), // random asset id 1-100
              },
            },
          },
        });

        if (childCollections.length === 0) return;
        childCollections.forEach(async (childCollection) => {
          const { translation: childTranslation, isPrivate: childIsPrivate } =
            childCollection;
          const childTransId = await this.prisma.collection_translation.create({
            data: {
              description: childTranslation.description,
              languageCode: childTranslation.languageCode as LanguageCode,
              name: childTranslation.name,
              slug: childTranslation.slug,
            },
            select: { id: true },
          });
          await this.prisma.collection.create({
            data: {
              isPrivate: childIsPrivate,
              collection_translation: {
                connect: { id: childTransId.id },
              },
              parentCollection: {
                connect: {
                  id: parentCollection.id,
                },
              },
              asset: {
                connect: {
                  id: faker.number.int({ min: 1, max: 100 }), // random asset id 1-100
                },
              },
            },
          });
        });
      });
      console.log('Collections created');
    }

    // Create product (with variants)
    const productsCount = await this.prisma.product.count();
    if (productsCount === 0) {
      console.log('Creating products...');
      this.createProductsBulk(this.prisma, 100);
    }

    console.log(
      'SEED: finished seeding DB from main.ts file in the AUTH service',
    );
  }
  async clean() {
    console.info('Dropping all tables in the database...');
    const prisma = new PrismaClient();
    const tables = await this.getTables(prisma);
    const types = await this.getTypes(prisma);
    await this.dropTables(prisma, tables);
    await this.dropTypes(prisma, types);
    console.info('Cleaned database successfully');
    await prisma.$disconnect();
  }

  async getTables(prisma: PrismaClient): Promise<string[]> {
    const results: Array<{
      tablename: string;
    }> =
      await prisma.$queryRaw`SELECT tablename from pg_tables where schemaname = 'public';`;
    return results.map((result) => result.tablename);
  }
  async dropTypes(prisma: PrismaClient, types: string[]) {
    for (const type of types) {
      await prisma.$executeRawUnsafe(`DROP TYPE IF EXISTS "${type}" CASCADE;`);
    }
  }
  async getTypes(prisma: PrismaClient): Promise<string[]> {
    const results: Array<{
      typname: string;
    }> = await prisma.$queryRaw`
 SELECT t.typname
 FROM pg_type t 
 JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
 WHERE n.nspname = 'public';
 `;
    return results.map((result) => result.typname);
  }
  async dropTables(prisma: PrismaClient, tables: string[]): Promise<void> {
    for (const table of tables) {
      await prisma.$executeRawUnsafe(`DROP TABLE public."${table}" CASCADE;`);
    }
  }
}
