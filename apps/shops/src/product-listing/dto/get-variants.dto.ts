import { CurrencyCode, LanguageCode } from '@prisma/client';

class ProductTranslation {
  createdAt: Date;
  updatedAt: Date;
  languageCode: LanguageCode;
  name: string;
  slug: string;
  description: string;
  id: number;
  productId: number;
}
class VariantTranslation {
  createdAt: Date;
  updatedAt: Date;
  languageCode: LanguageCode;
  name: string;
  id: number;
  productVariantId: number;
}

class VariantAsset {
  preview: string;
  source: string;
}
class ProductAsset {
  source: string;
  preview: string;
  mimeType: string;
  name: string;
  width: number;
  height: number;
  id: number;
}

class VariantPrice {
  createdAt: Date;
  updatedAt: Date;
  currencyCode: CurrencyCode;
  id: number;
  channelId: number;
  price: number;
  variantId: number;
}
class VariantAssets {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  position: number;
  assetId: number;
  productVariantId: number;
}
export class GetVariant {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  enabled: boolean;
  sku: string;
  outOfStockThreshold: number;
  useGlobalOutOfStockThreshold: boolean;
  trackInventory: string;
  id: number;
  assetId: number;
  productId: number;
  translations: VariantTranslation[];
  asset: VariantAsset;
  price: VariantPrice[];
  productVariantAssets: VariantAssets[];
  product: {
    id: number;
  };
}

export class VariantsOfCollection extends GetVariant {}

class ProductOptionTranslation {
  createdAt: Date;
  updatedAt: Date;
  languageCode: LanguageCode;
  name: string;
  id: number;
  productOptionId: number;
}
class ProductOption {
  code: string;
  id: number;
  translations: ProductOptionTranslation[];
}
class ProductOptionsGroup {
  id: number;
  translations: ProductTranslation[];
  productOptions: ProductOption[];
}
export class GetProduct {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  translations: ProductTranslation[];
  enabled: boolean;
  asset: ProductAsset;
  optionsGroup: ProductOptionsGroup[];
}
export class ProductsOfCollection extends GetProduct {}
export class GetProductById {
  vairantsCount: number;
  product: GetProduct;
}
