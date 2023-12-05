import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMobileAppConfigDto } from './create-mobile-app-config.dto';
import { IsArray, IsOptional } from 'class-validator';

export class UpdateMobileAppConfigDto extends PartialType(
  CreateMobileAppConfigDto,
) {
  @ApiProperty({
    description: 'System config ids',
    example: [1, 2, 3],
    required: false,
    type: Array,
    items: {
      type: 'number',
    },
  })
  @IsOptional()
  @IsArray()
  systemConfig?: number[];
}
