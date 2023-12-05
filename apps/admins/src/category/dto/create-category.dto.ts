import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category link',
    example: 'category-link',
    required: false,
    format: 'string',
  })
  @IsOptional()
  @IsString()
  categoryLink: string;

  @ApiProperty({
    description: 'Sort order',
    example: '1',
    required: false,
    format: 'number',
  })
  @IsOptional()
  @IsInt()
  sortOrder: number;

  @ApiProperty({
    description: 'Author id. Author is the user who created the category.',
    example: '1',
    required: false,
    format: 'number',
  })
  @IsOptional()
  @IsInt()
  authorId: number;

  @ApiProperty({
    description: 'Published',
    example: 'true',
    required: false,
    format: 'boolean',
  })
  @IsBoolean()
  published: boolean = false;

  @ApiProperty({
    description: 'Category name',
    example: 'category name',
    required: true,
    format: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Category Slug',
    example: 'Slug',
    required: true,
    format: 'string',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Products of the category (Optional)',
    isArray: true,
    format: 'number',
    type: Number,
    required: false,
  })
  @IsOptional()
  @IsInt({ each: true })
  products?: number[];
}
