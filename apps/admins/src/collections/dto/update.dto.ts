import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty({
    description: 'Collection ID',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  collectionId: number;

  @ApiProperty({
    description: 'Collection translation key',
    required: false,
    type: 'number',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  translationKey?: number;

  @ApiProperty({
    description:
      'Collection ID(s). This is the ID of the collection(s) that this collection contains.',
    example: [1, 2, 3],
    required: false,
  })
  @IsOptional()
  @IsInt({ each: true })
  nestedCollectionIds?: number[];

  @ApiProperty({
    description: 'Featured asset Id',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  featuredAssetId?: number;
}
