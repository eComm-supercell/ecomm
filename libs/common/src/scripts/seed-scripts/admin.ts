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
      source: faker.image.url({ width: 200, height: 200 }),
      preview: faker.image.url({ width: 200, height: 200 }),
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
        languageCode: 'ar',
        name: 'قسم الأطفال مع تقديم الخدمات',
        slug: 'الأطفال',
        description: 'قسم الأطفال مع تقديم الخدمات الإضافية',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم الأكل المنزلي',
        slug: 'الأطعمة',
        description: 'قسم الأكل المنزلي',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم كبار السن',
        slug: 'كبار السن',
        description: 'قسم كبار السن',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم الوجبات الصحية',
        slug: 'الوجبان الصحية',
        description: 'الوجبات الصحية',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم ماتشتهر به المحافظات العراقية ',
        slug: 'قسم ماتشتهر به المحافظات العراقية ',
        description: 'قسم ماتشتهر به المحافظات العراقية',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'خدمات مختلفة',
        slug: 'خدمات مختلفة',
        description: 'خدمات مختلفة',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم الحلويات و المعجنات',
        slug: 'الحلويات',
        description: 'الحلويات',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
      ],
    },
    {
      isPrivate: false,
      parentCollectionId: undefined,
      featuredAssetId: undefined,
      translation: {
        languageCode: 'ar',
        name: 'قسم التحفيات والانتيكات',
        slug: 'التحفيات والانتيكات',
        description: 'التحفيات والانتيكات',
      },
      childCollections: [
        // {
        //   isPrivate: false,
        //   parentCollectionId: 1,
        //   featuredAssetId: undefined,
        //   translation: {
        //     languageCode: 'en',
        //     name: 'Smartphones',
        //     slug: 'smartphones',
        //     description: 'Discover the latest smartphones and accessories.',
        //   },
        // }
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
