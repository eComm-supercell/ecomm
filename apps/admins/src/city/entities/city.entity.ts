import { ApiProperty } from '@nestjs/swagger';
import { ProvinceEntity } from '../../province/entities/province.entity';

export class CityEntity {
  @ApiProperty({
    description: 'City id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'City name',
    example: 'Mansour',
  })
  name: string;

  @ApiProperty({
    description: 'Delivery fee.',
    format: 'decimal',
    example: 10.5,
  })
  deleviryFee: number;

  @ApiProperty({
    description: 'Delivery time in days.',
    format: 'int',
    example: 2,
  })
  deleviryTime: number;

  @ApiProperty({
    description: 'Province that this city belongs to.',
    type: () => ProvinceEntity,
  })
  province: ProvinceEntity;
}
