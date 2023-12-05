import { ProvinceEnum } from '@libs/common/src/enums/province.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsEnum, IsInt } from 'class-validator';

export class CreateProvinceDto {
  @ApiProperty({
    description: 'Province name',
    example: 'Baghdad',
    enum: ProvinceEnum,
    required: true,
    isArray: false,
  })
  @IsEnum(ProvinceEnum)
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
}
