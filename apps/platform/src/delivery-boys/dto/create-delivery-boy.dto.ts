import DeliveryBoyStatus from '@libs/common/src/enums/delivery-boy-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDeliveryBoyDto {
  @ApiProperty({
    description: 'Delivery boy name',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Email Address',
    example: 'example@email.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Phone number',
    example: '07701234567',
    required: false,
  })
  @IsOptional()
  @IsMobilePhone('ar-IQ')
  mobile?: string;

  @ApiProperty({
    description: 'Account status',
    example: 'active',
    required: false,
    enum: DeliveryBoyStatus,
    isArray: false,
  })
  @IsOptional()
  @IsEnum(DeliveryBoyStatus)
  status?: DeliveryBoyStatus = DeliveryBoyStatus.active;

  @ApiProperty({
    description: 'Account threshold',
    example: '1000',
    format: 'float',
    required: false,
  })
  @IsOptional()
  @IsDecimal()
  depitThreshold?: number;

  @ApiProperty({
    description: 'User Id',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId: number;
}
