import { UserType, Gender, AuthenticationStartegy, AuthenticationIdentifier, LanguageCode, CurrencyCode, DaysOff, ShopStatus, ShopType } from '@prisma/client';
import { faker } from '@faker-js/faker';



export function fakeuser() {
  return {
    deletedAt: undefined,
    identifier: undefined,
    lastLogin: undefined,
    emailAddress: undefined,
    phoneNumber: undefined,
  };
}
export function fakeuserComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    identifier: undefined,
    verified: false,
    lastLogin: undefined,
    id: faker.datatype.number(),
    emailAddress: undefined,
    phoneNumber: undefined,
    authentication_methodId: undefined,
  };
}
export function fakeprofile() {
  return {
    deletedAt: undefined,
    firstName: faker.name.firstName(),
    lastName: undefined,
    gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE] as const),
  };
}
export function fakeprofileComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    firstName: faker.name.firstName(),
    lastName: undefined,
    id: faker.datatype.number(),
    userId: undefined,
    gender: faker.helpers.arrayElement([Gender.MALE, Gender.FEMALE] as const),
    age: 12,
  };
}
export function fakeauthentication_method() {
  return {
    passwordHash: undefined,
    verificationToken: undefined,
    passwordResetToken: undefined,
    identifierChangeToken: undefined,
    pendingIdentifier: undefined,
    externalIdentifier: undefined,
    metadata: undefined,
    type: undefined,
    strategy: undefined,
    identifier: undefined,
  };
}
export function fakeauthentication_methodComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordHash: undefined,
    verificationToken: undefined,
    passwordResetToken: undefined,
    identifierChangeToken: undefined,
    pendingIdentifier: undefined,
    externalIdentifier: undefined,
    metadata: undefined,
    id: faker.datatype.number(),
    type: undefined,
    strategy: undefined,
    identifier: undefined,
  };
}
export function fakesession() {
  return {
    token: faker.lorem.words(5),
    expires: faker.datatype.datetime(),
    invalidated: faker.datatype.boolean(),
    authenticationStrategy: undefined,
    type: faker.lorem.words(5),
  };
}
export function fakesessionComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    token: faker.lorem.words(5),
    expires: faker.datatype.datetime(),
    invalidated: faker.datatype.boolean(),
    authenticationStrategy: undefined,
    id: faker.datatype.number(),
    type: faker.lorem.words(5),
    userId: undefined,
  };
}
export function fakerole() {
  return {
    code: faker.lorem.words(5),
    description: faker.lorem.words(5),
    permissions: faker.lorem.words(5),
  };
}
export function fakeroleComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    code: faker.lorem.words(5),
    description: faker.lorem.words(5),
    permissions: faker.lorem.words(5),
    id: faker.datatype.number(),
  };
}
export function fakeuser_roles_roleComplete() {
  return {
    userId: faker.datatype.number(),
    roleId: faker.datatype.number(),
  };
}
export function fakeasset() {
  return {
    name: faker.name.fullName(),
    type: faker.lorem.words(5),
    mimeType: faker.lorem.words(5),
    fileSize: faker.datatype.number(),
    source: faker.lorem.words(5),
    preview: faker.lorem.words(5),
  };
}
export function fakeassetComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: faker.name.fullName(),
    type: faker.lorem.words(5),
    mimeType: faker.lorem.words(5),
    width: 0,
    height: 0,
    fileSize: faker.datatype.number(),
    source: faker.lorem.words(5),
    preview: faker.lorem.words(5),
    id: faker.datatype.number(),
  };
}
export function fakecollectionComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    isPrivate: false,
    featuredAssetId: undefined,
    id: faker.datatype.number(),
    parentCollectionId: undefined,
  };
}
export function fakecollection_product_variantsComplete() {
  return {
    collectionId: faker.datatype.number(),
    productVariantId: faker.datatype.number(),
  };
}
export function fakecollection_translation() {
  return {
    languageCode: faker.helpers.arrayElement([LanguageCode.en, LanguageCode.ar] as const),
    name: faker.name.fullName(),
    slug: faker.lorem.words(5),
    description: faker.lorem.words(5),
  };
}
export function fakecollection_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.helpers.arrayElement([LanguageCode.en, LanguageCode.ar] as const),
    name: faker.name.fullName(),
    slug: faker.lorem.words(5),
    description: faker.lorem.words(5),
    id: faker.datatype.number(),
    collectionId: undefined,
  };
}
export function fakefacet() {
  return {
    code: faker.lorem.words(5),
  };
}
export function fakefacetComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    isPrivate: false,
    code: faker.lorem.words(5),
    id: faker.datatype.number(),
  };
}
export function fakefacet_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakefacet_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    id: faker.datatype.number(),
    facetId: undefined,
  };
}
export function fakefacet_value() {
  return {
    code: faker.lorem.words(5),
  };
}
export function fakefacet_valueComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    code: faker.lorem.words(5),
    id: faker.datatype.number(),
    facetId: faker.datatype.number(),
  };
}
export function fakefacet_value_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakefacet_value_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    id: faker.datatype.number(),
    facetValueId: undefined,
  };
}
export function fakeglobal_settings() {
  return {
    availableLanguages: faker.lorem.words(5),
  };
}
export function fakeglobal_settingsComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    availableLanguages: faker.lorem.words(5),
    trackInventory: true,
    outOfStockThreshold: 0,
    id: faker.datatype.number(),
  };
}
export function fakeproduct() {
  return {
    deletedAt: undefined,
  };
}
export function fakeproductComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    enabled: true,
    id: faker.datatype.number(),
    assetId: undefined,
  };
}
export function fakeproduct_asset() {
  return {
    position: faker.datatype.number(),
  };
}
export function fakeproduct_assetComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    position: faker.datatype.number(),
    id: faker.datatype.number(),
    assetId: faker.datatype.number(),
    productId: faker.datatype.number(),
  };
}
export function fakeproduct_option() {
  return {
    deletedAt: undefined,
    code: faker.lorem.words(5),
  };
}
export function fakeproduct_optionComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    code: faker.lorem.words(5),
    id: faker.datatype.number(),
    productOptiongroupId: faker.datatype.number(),
  };
}
export function fakeproduct_option_group() {
  return {
    deletedAt: undefined,
    code: faker.lorem.words(5),
  };
}
export function fakeproduct_option_groupComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    code: faker.lorem.words(5),
    id: faker.datatype.number(),
    productId: undefined,
  };
}
export function fakeproduct_option_group_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakeproduct_option_group_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    id: faker.datatype.number(),
    productOptionGroupId: faker.datatype.number(),
  };
}
export function fakeproduct_option_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakeproduct_option_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    id: faker.datatype.number(),
    productOptionId: undefined,
  };
}
export function fakeproduct_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    slug: faker.lorem.words(5),
    description: faker.lorem.words(5),
  };
}
export function fakeproduct_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    slug: faker.lorem.words(5),
    description: faker.lorem.words(5),
    id: faker.datatype.number(),
    productId: undefined,
  };
}
export function fakeproduct_variant() {
  return {
    deletedAt: undefined,
    sku: undefined,
  };
}
export function fakeproduct_variantComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
    enabled: true,
    sku: undefined,
    outOfStockThreshold: 0,
    useGlobalOutOfStockThreshold: true,
    trackInventory: 'INHERIT',
    id: faker.datatype.number(),
    assetId: undefined,
    productId: undefined,
  };
}
export function fakeproduct_variant_asset() {
  return {
    position: faker.datatype.number(),
  };
}
export function fakeproduct_variant_assetComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    assetId: faker.datatype.number(),
    position: faker.datatype.number(),
    productVariantId: faker.datatype.number(),
    id: faker.datatype.number(),
  };
}
export function fakeproduct_variant_facet_valuesComplete() {
  return {
    productVariantId: faker.datatype.number(),
    facetValueId: faker.datatype.number(),
  };
}
export function fakeproduct_facet_valuesComplete() {
  return {
    productId: faker.datatype.number(),
    facetValueId: faker.datatype.number(),
  };
}
export function fakeproduct_variant_optionsComplete() {
  return {
    productVariantId: faker.datatype.number(),
    productOptionId: faker.datatype.number(),
  };
}
export function fakeproduct_variant_price() {
  return {
    currencyCode: faker.helpers.arrayElement([CurrencyCode.USD, CurrencyCode.IQD] as const),
    channelId: undefined,
    price: faker.datatype.number(),
  };
}
export function fakeproduct_variant_priceComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    currencyCode: faker.helpers.arrayElement([CurrencyCode.USD, CurrencyCode.IQD] as const),
    id: faker.datatype.number(),
    channelId: undefined,
    price: faker.datatype.number(),
    variantId: undefined,
  };
}
export function fakeproduct_variant_translation() {
  return {
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
  };
}
export function fakeproduct_variant_translationComplete() {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    languageCode: faker.lorem.words(5),
    name: faker.name.fullName(),
    id: faker.datatype.number(),
    productVariantId: undefined,
  };
}
