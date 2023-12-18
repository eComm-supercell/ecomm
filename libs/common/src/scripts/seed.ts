import * as dotenv from 'dotenv';
import { LanguageCode, PrismaClient } from '@prisma/client';

if (require.main === module) {
  dotenv.config();

  try {
    seed();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
interface Collection {
  name: string;
  description: string;
  slug: string;
  languageCode: LanguageCode;
}

interface CollectionTree extends Collection {
  children: Collection[];
}

function seed() {
  console.info('Seeding database...');

  const client = new PrismaClient();
  const productCollections: CollectionTree[] = [
    {
      name: 'apparel',
      description: 'Clothing and Fashion Accessories',
      slug: 'apparel',
      languageCode: 'en',
      children: [
        {
          name: 'men',
          description: "Men's Clothing",
          slug: 'men',
          languageCode: 'en',
        },
        {
          name: 'women',
          description: "Women's Clothing",
          slug: 'women',
          languageCode: 'en',
        },
        {
          name: 'kids',
          description: "Kids' Clothing",
          slug: 'kids',
          languageCode: 'en',
        },
        {
          name: 'shoes',
          description: 'Footwear',
          slug: 'shoes',
          languageCode: 'en',
        },
        {
          name: 'accessories',
          description: 'Fashion Accessories',
          slug: 'accessories',
          languageCode: 'en',
        },
      ],
    },
    {
      name: 'electronics',
      description: 'Electronic Devices and Gadgets',
      slug: 'electronics',
      languageCode: 'en',
      children: [
        {
          name: 'smartphones',
          description: 'Smartphones',
          slug: 'smartphones',
          languageCode: 'en',
        },
        {
          name: 'laptops',
          description: 'Laptops',
          slug: 'laptops',
          languageCode: 'en',
        },
        {
          name: 'tablets',
          description: 'Tablets',
          slug: 'tablets',
          languageCode: 'en',
        },
        {
          name: 'cameras',
          description: 'Cameras',
          slug: 'cameras',
          languageCode: 'en',
        },
        {
          name: 'audio',
          description: 'Audio Devices',
          slug: 'audio',
          languageCode: 'en',
        },
        {
          name: 'wearables',
          description: 'Wearable Devices',
          slug: 'wearables',
          languageCode: 'en',
        },
      ],
    },
  ];

  productCollections.forEach(async (collection: CollectionTree) => {
    const { children, ...translation } = collection;
    const rootTransId = await client.collection_translation.create({
      data: translation,
      select: { id: true },
    });
    const parentCollection = await client.collection.create({
      data: {
        collection_translation: {
          connect: { id: rootTransId.id },
        },
      },
    });

    children.forEach(async (childCollection: CollectionTree) => {
      const { ...childTranslation } = childCollection;
      const childTransId = await client.collection_translation.create({
        data: childTranslation,
        select: { id: true },
      });
      await client.collection.create({
        data: {
          collection_translation: {
            connect: { id: childTransId.id },
          },
          parentCollection: {
            connect: {
              id: parentCollection.id,
            },
          },
        },
      });
    });
  });

  void client.$disconnect();

  console.info('Seeded database successfully');
}
