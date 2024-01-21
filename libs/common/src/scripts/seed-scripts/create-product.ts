import {
  CreateProductDto,
  CreateProductOptionDto,
  CreateProductOptionGroupTranslationDto,
  ProductOptionGroup,
} from '../../../../../apps/admins/src/products/dto/create-product.dto';
import _ from 'lodash';
import { faker } from '@faker-js/faker';
import { CurrencyCode, Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

/**
 * Finds the combinations of n elements in a collection
 * example : combination([1,2,3], 2) => [[1,2],[1,3],[2,3]]
 *
 * @param collection
 * @param n
 * @returns
 */
export function combination(collection, n) {
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

/**
 * Build product variants skeletons from option groups and options dynamically.
 * @param optionGroups
 * @returns
 */
export function buildProductVariantsSkeleton(
  optionGroups: ProductOptionGroup[],
) {
  const allOptions = optionGroups
    .map((group) => group.productOptions)
    .map((options) => options.map((option) => option));
  const dirty: any[] = combination(_.flatten(allOptions), optionGroups.length);

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

/**
 * Create option group with options
 * @param translations
 * @param options
 * @param productId
 * @param code
 * @param client
 * @returns
 */
export async function createOptionGroup(
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
/**
 * The majestic function that creates a product with all its options and option groups
 * @param body
 * @returns
 */
export async function createProduct(
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

  // const productAssetsIds = [
  //   faker.number.int({ min: 1, max: 99 }),
  //   faker.number.int({ min: 1, max: 99 }),
  // ];

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
      // productAssets: {
      //   create: productAssetsIds.map((assetId) => ({
      //     asset: {
      //       connect: {
      //         id: assetId,
      //       },
      //     },
      //     position: faker.number.int({ min: 1, max: 10 }),
      //   })),
      // },
      // asset: {
      //   connect: {
      //     id: productAssetsIds[0],
      //   },
      // },
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
    const newGroup: ProductOptionGroup = await createOptionGroup(
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
  const productVariantsSkeletonList = buildProductVariantsSkeleton(
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

/**
 * Seed DB with `n` dummy products
 * @param client
 * @param n
 */
export function createProductsBulk(
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

  test.forEach(async (product) => await createProduct(product, client));
  console.log('Products created');
}
