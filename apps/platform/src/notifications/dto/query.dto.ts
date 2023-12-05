import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class NotificationsQueryDto {
  @ApiProperty({ type: Boolean, required: false })
  @Transform(({ value }) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return undefined;
    }
  })
  @IsOptional()
  @IsBoolean()
  isRead?: boolean;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return undefined;
    }
  })
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ type: Number, description: 'User ID', required: true })
  @Transform(({ value }) => Number(value))
  @IsInt()
  userId: number;
}
