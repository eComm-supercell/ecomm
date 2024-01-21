import { ApiProperty } from '@nestjs/swagger';
import { AssetType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SaveAssetDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    enum: AssetType,
  })
  @IsOptional()
  @IsEnum(AssetType)
  type: AssetType;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  mimeType: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsInt()
  width: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsInt()
  height: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsInt()
  fileSize: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  source: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  preview: string;
}
