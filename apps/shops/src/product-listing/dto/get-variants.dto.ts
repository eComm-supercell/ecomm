import { CurrencyCode, LanguageCode } from '@prisma/client';

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
