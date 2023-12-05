import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag title',
    example: 'Tag',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Tag slug',
    example: 'slug',
    required: true,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Products Ids array',
    isArray: true,
    format: 'number',
    type: Number,
    required: true,
    example: [1, 2],
  })
  @IsArray({ each: true })
  productsIds: number[];
}
