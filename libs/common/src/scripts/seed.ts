import * as dotenv from 'dotenv';
import { LanguageCode, PrismaClient } from '@prisma/client';
import {
  collectionsList,
  generateFacets,
  fakeasset,
} from '../scripts/seed-scripts/admin';
import { faker } from '@faker-js/faker';
import { createProductsBulk } from './seed-scripts/create-product';

if (require.main === module) {
  dotenv.config();

  seed()
    .then(() => {
      console.info('Done seeding database');
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

async function seed() {
  console.info('Seeding database...');

  const client = new PrismaClient();

  // Create assets if not exist
  const assetsCount = await client.asset.count();
  if (assetsCount === 0) {
    console.log('Creating assets...');

    await client.asset.createMany({
      data: fakeasset(100).map((asset) => ({
        ...asset,
      })),
    });
    console.log('Assets created');
  }

  // create facets
  const facetsCount = await client.facet.count();
  if (facetsCount === 0) {
    console.log('Creating facets...');
    generateFacets().forEach(async ({ facet, values }) => {
      await client.facet.create({
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
  const collectionCount = await client.collection.count();
  if (collectionCount === 0) {
    console.log('Creating collections...');
    collectionsList().forEach(async (collection) => {
      const { isPrivate, translation, childCollections } = collection;
      const rootTransId = await client.collection_translation.create({
        data: {
          description: translation.description,
          languageCode: translation.languageCode as LanguageCode,
          name: translation.name,
          slug: translation.slug,
        },
        select: { id: true },
      });
      const parentCollection = await client.collection.create({
        data: {
          collection_translation: {
            connect: { id: rootTransId.id },
          },
          isPrivate,
          asset: {
            connect: {
              id: faker.datatype.number({ min: 1, max: 100 }), // random asset id 1-100
            },
          },
        },
      });

      if (childCollections.length === 0) return;
      childCollections.forEach(async (childCollection) => {
        const { translation: childTranslation, isPrivate: childIsPrivate } =
          childCollection;
        const childTransId = await client.collection_translation.create({
          data: {
            description: childTranslation.description,
            languageCode: childTranslation.languageCode as LanguageCode,
            name: childTranslation.name,
            slug: childTranslation.slug,
          },
          select: { id: true },
        });
        await client.collection.create({
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
                id: faker.datatype.number({ min: 1, max: 100 }), // random asset id 1-100
              },
            },
          },
        });
      });
    });
    console.log('Collections created');
  }

  // Create product (with variants)
  const productsCount = await client.product.count();
  if (productsCount === 0) {
    console.log('Creating products...');
    createProductsBulk(client, 100);
  }

  void client.$disconnect();

  console.info('Seeded database successfully');
}
