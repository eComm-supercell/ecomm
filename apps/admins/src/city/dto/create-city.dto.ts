import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateCityDto {
  @ApiProperty({
    description: 'City name',
    example: 'Mansour',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Delivery fee',
    example: '2000.2',
    required: true,
    format: 'decimal',
    type: String,
  })
  @IsDecimal({ force_decimal: true, decimal_digits: '1,2' })
  deleviryFee: number;

  @ApiProperty({
    description: 'Delivery time in days',
    example: 2,
    required: true,
    format: 'int',
  })
  @IsInt()
  deleviryTime: number;

  @ApiProperty({
    description: 'Province id',
    example: 1,
    required: true,
    format: 'int',
  })
  @IsInt()
  provinceId: number;
}
