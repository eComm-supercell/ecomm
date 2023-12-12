import { Decimal } from '@prisma/client/runtime/library';

export class Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeyword?: string | null;
  defaultVariant?: number | null;
  isSale?: boolean | null;
  price: Decimal;
  quantity?: number | null;
  isWholeSale?: boolean | null;
  trackQuantity?: boolean | null;
  allowOutOfStockPurchases?: boolean | null;
  brand?: string | null;
  description?: string | null;
  published: boolean;

  shopId?: number | null;
  availableFrom?: Date | null;
  availableTo?: Date | null;
  isFeatured?: boolean | null;
  isBestSeller?: boolean | null;
  isTopRated?: boolean | null;
  isSpecialOffer?: boolean | null;
  isAvliable?: boolean | null;
  keywords?: string | null;
  productImages: ProductImage[];
  tags: Tag[];
  productVariants: ProductVariant[];

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    price: Decimal,
    published: boolean,
    productImages: ProductImage[],
    tags: Tag[],
    productVariants: ProductVariant[],
    slug?: string,
    metaTitle?: string,
    metaDescription?: string,
    metaKeyword?: string,
    defaultVariant?: number,
    isSale?: boolean,
    quantity?: number,
    isWholeSale?: boolean,
    trackQuantity?: boolean,
    allowOutOfStockPurchases?: boolean,
    brand?: string,
    description?: string,
    shopId?: number,
    availableFrom?: Date,
    availableTo?: Date,
    isFeatured?: boolean,
    isBestSeller?: boolean,
    isTopRated?: boolean,
    isSpecialOffer?: boolean,
    isAvliable?: boolean,
    keywords?: string,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.name = name;
    this.slug = slug;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaKeyword = metaKeyword;
    this.defaultVariant = defaultVariant;
    this.isSale = isSale;
    this.price = price;
    this.quantity = quantity;
    this.isWholeSale = isWholeSale;
    this.trackQuantity = trackQuantity;
    this.allowOutOfStockPurchases = allowOutOfStockPurchases;
    this.brand = brand;
    this.description = description;
    this.published = published;
    this.shopId = shopId;
    this.availableFrom = availableFrom;
    this.availableTo = availableTo;
    this.isFeatured = isFeatured;
    this.isBestSeller = isBestSeller;
    this.isTopRated = isTopRated;
    this.isSpecialOffer = isSpecialOffer;
    this.isAvliable = isAvliable;
    this.keywords = keywords;
    this.productImages = productImages;
    this.tags = tags;
    this.productVariants = productVariants;
  }
}

export class ProductImage {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  orginal?: string | null;
  thumbnail?: string | null;
  medium?: string | null;
  large?: string | null;
  altText?: string | null;
  productId?: number | null;
  productVariantId?: number | null;
  status?: number | null;
  sortOrder?: number | null;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,

    productId: number,
    orginal?: string,
    thumbnail?: string,
    medium?: string,
    large?: string,
    altText?: string,
    status?: number | null,

    sortOrder?: number | null,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.orginal = orginal;
    this.thumbnail = thumbnail;
    this.medium = medium;
    this.large = large;
    this.altText = altText;
    this.productId = productId;
    this.status = status;
    this.sortOrder = sortOrder;
  }
}

export class Tag {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug?: string | null;
}

export class ProductVariant {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  productId?: number | null;
  price?: Decimal | null;
  discount?: Decimal | null;
  quantity?: number | null;
  sku?: string | null;
  barcode?: string | null;
  status: number | null;
  sortOrder?: number | null;
  productVariantImage: ProductImage[];

  constructor(
    id: number,
    sku: string,
    price: Decimal,

    status: number,
    productVariantImage: ProductImage[],

    createdAt: Date,
    updatedAt: Date,
    quantity?: number,
    barcode?: string,
    discount?: Decimal | null,

    sortOrder?: number,
    productId?: number,
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.productId = productId;
    this.price = price;
    this.discount = discount;
    this.quantity = quantity;
    this.sku = sku;
    this.barcode = barcode;
    this.status = status;
    this.sortOrder = sortOrder;
    this.productVariantImage = productVariantImage;
  }
}
