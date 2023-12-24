import { KeysetPaginationDto } from '@libs/common/src/dto/keyset-params-pagination.dto';
import { ToBoolean } from '@libs/common/src/utils/toBoolean';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@prisma/client';
import { IsBoolean, IsOptional } from 'class-validator';

class GetCollectionsTranslationDto {
  name: string;
  description: string;
  languageCode: LanguageCode;
  slug: string;
  id: number;
}
class GetCollectionsAssetDto {
  source: string;
  preview: string;
  mimeType: string;
  name: string;
  width: number;
  height: number;
  id: number;
}
class NestedCollection {
  isPrivate: boolean;
  id: number;
  parentCollectionId: number | null;
  asset: GetCollectionsAssetDto;
  collection_translation: GetCollectionsTranslationDto[];
}
export class GetCollectionsDto {
  @ApiProperty({
    type: Boolean,
    description: 'Is this collection private?',
  })
  isPrivate: boolean;

  @ApiProperty({
    type: Number,
    description: 'Collection ID',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Parent collection ID',
  })
  parentCollectionId: null | number;

  @ApiProperty({
    type: GetCollectionsAssetDto,
    description: 'Collection asset',
  })
  asset: GetCollectionsAssetDto;

  @ApiProperty({
    type: GetCollectionsTranslationDto,
    description: 'Collection translation',
    isArray: true,
  })
  collection_translation: GetCollectionsTranslationDto[];

  @ApiProperty({
    type: NestedCollection,
    description: 'Nested collections',
    isArray: true,
  })
  nestedCollections: NestedCollection[];
}

export class QueryCollectionsParamsDto extends KeysetPaginationDto {
  @ApiProperty({
    type: Boolean,
    required: false,
    description: 'Include nested collections',
  })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  children?: boolean;
}
