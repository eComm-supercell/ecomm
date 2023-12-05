import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @ApiProperty({
    description: 'List of City ID (Optional)',
    example: [1, 2],
    required: false,
    isArray: true,
    type: Number,
    format: 'number',
  })
  @IsOptional()
  @IsInt({ each: true })
  cities?: number[];
}
