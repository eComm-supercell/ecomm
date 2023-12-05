import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateNotificationTokenDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
    type: Number,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Token',
    example: 'token',
    type: String,
  })
  @IsString()
  token: string;
}
