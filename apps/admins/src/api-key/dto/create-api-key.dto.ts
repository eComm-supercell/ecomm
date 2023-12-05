import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({
    description: 'Key of the api key',
    example: 'key',
  })
  @IsString()
  key: string;
}
