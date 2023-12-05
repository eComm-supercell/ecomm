import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class DeliveryBoyEntity {
  @ApiProperty({
    description: 'Delivery boy Id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Delivery boy name',
    example: 'John Doe',
  })
  name?: string | null;

  @ApiProperty({
    description: 'Delivery boy email',
    example: 'example@email.com',
    format: 'email',
  })
  email?: string | null;

  @ApiProperty({
    description: 'Delivery boy phone number',
    example: '07701234567',
    format: 'phone',
  })
  mobile?: string | null;

  @ApiProperty({
    description: 'Status',
    example: 'active',
    enum: ['active', 'inactive', 'suspended'],
  })
  status?: string | null;

  @ApiProperty({
    description: 'Reason for suspension',
    example: 'exceed the threshold',
  })
  suspendReason?: string | null;

  @ApiProperty({
    description: 'Date of suspension',
    example: '2021-01-01',
    format: 'date',
  })
  suspendDate?: Date | null;

  @ApiProperty({
    description: 'Threshold',
    example: '1000',
    format: 'decimal',
  })
  depitThreshold?: Decimal | null;

  @ApiProperty({
    description: 'Created at',
    example: '2021-01-01',
    format: 'date-time',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2021-01-01',
    format: 'date-time',
  })
  updatedAt?: Date;
}
