import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AssetDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  fieldname: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @ApiProperty({ type: 'string', example: '7bit' })
  @IsString()
  @IsNotEmpty()
  encoding: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @ApiProperty({ type: 'buffer' })
  @IsNotEmpty()
  buffer: Buffer;

  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsInt()
  size: number;
}

export class AssetUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  asset: AssetDto;
}
