import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindQueryDto {
  @ApiProperty({
    description: 'Tag slug',
    type: 'string',
    example: 'slug',
    required: false,
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({
    description: 'Tag title',
    type: 'string',
    example: 'title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
