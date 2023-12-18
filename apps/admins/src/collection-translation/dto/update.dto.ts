import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCollectionTranslationDto } from './create.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCollectionTranslationDto extends PartialType(
  CreateCollectionTranslationDto,
) {
  @ApiProperty({
    description: 'Collection translation ID',
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  collectionTranslationId: number;
}
