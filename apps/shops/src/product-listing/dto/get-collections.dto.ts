import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@prisma/client';

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
  })
  nestedCollections: NestedCollection[];
}
