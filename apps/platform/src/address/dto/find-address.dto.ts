import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FindQueryDto {
  @ApiProperty({
    description: 'Address Id',
    type: 'number',
    example: '1',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  addressId?: number;

  @ApiProperty({
    description: 'Profile Id. Find address by profile ID.',
    type: 'number',
    example: '1',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  profileId?: number;
}
