import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDeliveryBoyDto } from './create-delivery-boy.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryBoyDto extends PartialType(CreateDeliveryBoyDto) {
  @ApiProperty({
    description: 'Account suspend reason',
    example: 'Excced the threshold',
    required: false,
  })
  @IsOptional()
  @IsString()
  suspendReason?: string;

  @ApiProperty({
    description: 'Account suspend date',
    format: 'date-time',
    example: '2021-08-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  suspendDate?: string;
}
