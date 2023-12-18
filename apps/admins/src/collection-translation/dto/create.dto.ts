import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionTranslationDto {
  @ApiProperty({
    description: 'Language code',
    enum: LanguageCode,
    required: true,
    example: 'en',
  })
  @IsString()
  @IsEnum(LanguageCode)
  @IsNotEmpty()
  languageCode: LanguageCode;

  @ApiProperty({
    description: 'Collection name',
    required: true,
    example: 'Electronics',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Collection slug',
    required: true,
    example: 'This is collection slug',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Collection description',
    required: true,
    example: 'This is collection slug',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
