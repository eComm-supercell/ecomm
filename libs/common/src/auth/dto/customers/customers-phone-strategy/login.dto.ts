import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';
export class CustomerPhoneLoginDto {
  @ApiProperty({
    description: 'Customer phone number',
    required: true,
    example: '0781234567',
  })
  @IsPhoneNumber('IQ')
  phone: string;
}
