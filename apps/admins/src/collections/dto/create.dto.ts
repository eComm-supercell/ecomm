import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    description: 'Collection translation key',
    required: true,
    type: 'number',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  translationKey: number;

  @ApiProperty({
    description:
      'Collection ID(s). This is the ID of the collection(s) that this collection contains.',
    example: [1, 2, 3],
    required: false,
  })
  @IsOptional()
  @IsInt({ each: true })
  nestedCollectionIds?: number[];
}
