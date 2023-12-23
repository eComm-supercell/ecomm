import { faker } from '@faker-js/faker';
export function fakeasset(n: number) {
  const list: any[] = [];
  for (let index = 0; index < n; index++) {
    list.push({
      name: faker.commerce.productName(),
      type: 'image',
      mimeType: faker.helpers.arrayElement([
        'image/jpeg',
        'image/png',
        'image/gif',
      ] as const),
      fileSize: 500,
      width: 200,
      height: 200,
      source: faker.image.imageUrl(200, 200, 'products', true),
      preview: faker.image.imageUrl(100, 100, 'products', true),
    });
  }
  return list;
}
export function collectionsList() {
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
        description: 'Find stylish and comfortable home decor and furnishings.',
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

interface IFace {
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

export function generateFacets(): IFace[] {
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
