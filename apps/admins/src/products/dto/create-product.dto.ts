import { ApiProperty } from '@nestjs/swagger';
import { CurrencyCode, LanguageCode } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
/**
 * Product options DTO (Options + Groups)
 *
 *
 *
 *
 *
 */
class CreateProductOptionTranslationDto {
  @ApiProperty({
    description: 'Product option name',
    required: true,
    example: 'Product option name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product option language code',
    required: true,
    example: LanguageCode,
    enum: LanguageCode,
  })
  @IsNotEmpty()
  @IsEnum(LanguageCode)
  languageCode: LanguageCode;
}
export class CreateProductOptionDto {
  @ApiProperty({
    description: 'Product option code',
    required: true,
    example: 'Product option code',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Product option translations',
    required: true,
    example: [
      {
        name: 'Product option name',
        languageCode: LanguageCode,
      },
    ],
    isArray: true,
    type: CreateProductOptionTranslationDto,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductOptionTranslationDto)
  translations: CreateProductOptionTranslationDto[];
}

export class CreateProductOptionGroupTranslationDto {
  @ApiProperty({
    description: 'Product option group name',
    required: true,
    example: 'Product option group name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product option group language code',
    required: true,
    example: LanguageCode.en,
    enum: LanguageCode,
  })
  @IsNotEmpty()
  @IsEnum(LanguageCode)
  languageCode: LanguageCode;
}
class CreateProductOptionGroupDto {
  @ApiProperty({
    description: 'Product option group code',
    required: true,
    example: 'Product option group code',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Product option group translations',
    required: true,
    isArray: true,
    type: CreateProductOptionGroupTranslationDto,
    example: [
      {
        name: 'Product option group name',
        languageCode: LanguageCode.en,
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductOptionGroupTranslationDto)
  translations: CreateProductOptionGroupTranslationDto[];

  @ApiProperty({
    description: 'Product option group',
    required: true,
    isArray: true,
    type: CreateProductOptionGroupDto,
    example: [
      {
        code: 'Product option group code',
        translations: [
          {
            name: 'Product option group name',
            languageCode: LanguageCode.en,
          },
        ],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductOptionDto)
  options: CreateProductOptionDto[];
}
/**
 * Create Product variant DTO
 *
 *
 *
 *
 *
 */
export class CreateProductVariantDto {
  @ApiProperty({
    description: 'Product variant is enabled or not',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({
    description: 'Product variant out of stock threshold',
    required: false,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  outOfStockThreshold?: number;

  @ApiProperty({
    description: 'Product variant sku',
    required: false,
    example: 'Product variant sku',
  })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiProperty({
    description: 'Product variant track inventory',
    required: false,
    example: 'Product variant track inventory',
  })
  @IsOptional()
  @IsString()
  trackInventory?: string;

  @ApiProperty({
    description: 'Use global out of stock threshold or not',
    required: true,
    example: 1,
  })
  @IsOptional()
  @IsBoolean()
  useGlobalOutOfStockThreshold?: boolean;

  @ApiProperty({
    description: 'Product variant price',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Product variant currency code',
    required: true,
    example: CurrencyCode.USD,
  })
  @IsNotEmpty()
  @IsEnum(CurrencyCode)
  currencyCode: CurrencyCode;

  @ApiProperty({
    description: 'Product Variant facet values',
    required: false,
    example: [1],
    isArray: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  productVariantFacetValues?: number[];

  @ApiProperty({
    description: 'Product Variant collections',
    required: false,
    example: [1],
    isArray: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  productVariantCollections?: number[];
}

/**
 * Create Product DTO
 *
 *
 *
 *
 */
class CreateProductTranslationDto {
  @ApiProperty({
    description: 'Product description',
    required: true,
    example: 'Product description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product language code',
    required: true,
    example: LanguageCode.en,
    enum: LanguageCode,
  })
  @IsNotEmpty()
  @IsEnum(LanguageCode)
  languageCode: string;

  @ApiProperty({
    description: 'Product name',
    required: true,
    example: 'Product name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Product slug',
    required: true,
    example: 'Product slug',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;
}
export class CreateProductDto {
  @ApiProperty({
    description: 'Product is enabled or not',
    required: false,
  })
  @IsBoolean()
  enabled?: boolean;

  @ApiProperty({
    description: 'Product translations',
    required: true,
    isArray: true,
    type: CreateProductTranslationDto,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductTranslationDto)
  translations: CreateProductTranslationDto[];

  @ApiProperty({
    description: 'Product option group',
    required: true,
    type: CreateProductOptionGroupDto,
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductOptionGroupDto)
  productOptionGroup: CreateProductOptionGroupDto[];

  @ApiProperty({
    description: 'Product facet values',
    required: false,
    example: [1],
    isArray: true,
    type: Number,
  })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  productFacetValues?: number[];

  @ApiProperty({
    description: 'Product variants',
    required: false,
    isArray: true,
    type: CreateProductVariantDto,
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateProductVariantDto)
  productVariants: CreateProductVariantDto[];
}

class ProductOption {
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  code: string;
  id: number;
  productOptiongroupId: number;
}

class ProductOptionTranslation {
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt?: Date | null;
  name: string;
  id: number;
  productOptionGroupId: number;
}

export class ProductOptionGroup {
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  code: string;
  id: number;
  productId: number | null;
  productOptions: ProductOption[];
  translations: ProductOptionTranslation[];
}
