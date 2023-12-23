import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class CreateFacetTranslationDto {
  @ApiProperty({
    description: 'Facet name',
    type: String,
    example: 'Color',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Language code',
    type: String,
    enum: LanguageCode,
    example: LanguageCode.en,
  })
  @IsNotEmpty()
  @IsEnum(LanguageCode)
  languageCode: LanguageCode;
}

export class CreateFacetDto {
  @ApiProperty({
    description: 'Is Facet private or not',
    type: 'boolean',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;

  @ApiProperty({
    description: 'Facet code',
    type: String,
    example: 'color',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Facet translations',
    type: CreateFacetTranslationDto,
    isArray: true,
    example: [{ name: 'Color', languageCode: LanguageCode.en }],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFacetTranslationDto)
  translations: CreateFacetTranslationDto[];
}
export class CreateFacetValueTranslationDto {
  @ApiProperty({
    description: 'Facet value name',
    type: String,
    example: 'Color',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Language code',
    type: String,
    enum: LanguageCode,
    example: LanguageCode.en,
  })
  @IsNotEmpty()
  @IsEnum(LanguageCode)
  languageCode: LanguageCode;
}
export class FacetValueDto {
  @ApiProperty({
    description: 'Facet value translations',
    type: CreateFacetValueTranslationDto,
    isArray: true,
    example: [{ name: 'Color', languageCode: LanguageCode.en }],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFacetValueTranslationDto)
  translations: CreateFacetValueTranslationDto[];

  @ApiProperty({
    description: 'Facet code',
    type: String,
    example: 'color',
  })
  @IsNotEmpty()
  @IsString()
  code: string;
}
export class AddFacetValuesDto {
  @ApiProperty({
    description: 'Facet id',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  facetId: number;

  @ApiProperty({
    description: 'Facet values',
    type: FacetValueDto,
    isArray: true,
    example: [
      {
        code: 'red',
        translations: [{ name: 'Red', languageCode: LanguageCode.en }],
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FacetValueDto)
  values: FacetValueDto[];
}
export class CreateFacetResponse {
  @ApiProperty({
    description: 'Facet id',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  facetId: number;
}

class Translations {
  createdAt: string;
  updatedAt: string;
  languageCode: LanguageCode;
  name: string;
  id: number;
  facetId: number;
}

class FacetValues {
  createdAt: string;
  updatedAt: string;
  code: string;
  id: number;
  facetId: number;
}

export class FacetQueryResponse {
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
  code: string;
  id: number;
  translations: Translations[];
  facetValues: FacetValues[];
}
