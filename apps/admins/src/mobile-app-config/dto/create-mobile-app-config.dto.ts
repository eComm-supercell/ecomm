import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsString } from 'class-validator';

export class CreateMobileAppConfigDto {
  @ApiProperty({
    format: 'json',
    type: String,
    example: `{"this": "is JSON"}`,
    required: true,
  })
  @IsJSON()
  retailLayout: string;

  @ApiProperty({
    format: 'json',
    type: String,
    example: `{"this": "is JSON"}`,
    required: true,
  })
  @IsJSON()
  resturantLayout: string;

  @ApiProperty({
    format: 'json',
    type: String,
    example: `{"this": "is JSON"}`,
    required: true,
  })
  @IsJSON()
  appConfig: string;

  @ApiProperty({
    type: String,
    example: '1.0.0',
    required: true,
  })
  @IsString()
  appVersion: string;
}
