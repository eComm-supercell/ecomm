import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Notification title',
    example: 'New Order',
    required: true,
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Notification description',
    example: 'Description of the notification',
    required: true,
    type: String,
  })
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Notification type',
    example: 'Notification type',
    required: true,
    type: String,
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'User ID',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Notification is read or not',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isRead: boolean;

  @ApiProperty({
    description: 'Notification is deleted or not',
    example: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
