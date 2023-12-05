import { ProvinceEnum } from '@libs/common/src/enums/province.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class ProvinceEntity {
  @ApiProperty({
    description: 'Province name',
    enum: ProvinceEnum,
    isArray: false,
  })
  name: string;

  @ApiProperty({
    description: 'Delivery fee.',
    format: 'decimal',
    type: Number,
  })
  deleviryFee: Decimal;

  @ApiProperty({
    description: 'Delivery time in days.',
    format: 'int',
  })
  deleviryTime: number;
}

export class ProvinceWitCityEntity extends ProvinceEntity {
  @ApiProperty({
    description: 'Cities related to the province.',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
      },
    },
  })
  city: {
    id: number;
    name: string;
  }[];
}
