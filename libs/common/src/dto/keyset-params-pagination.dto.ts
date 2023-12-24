import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class KeysetPaginationDto {
  @ApiProperty({
    type: Number,
    description:
      'Offset. Used for pagination using `Offset and Limit` pagination. This param can be use with the `limit` param to get the data chunk size',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiProperty({
    description:
      'Limit. Used for pagination using `Offset and Limit` pagination',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({
    description:
      'Starting ID. Used for pagination using `Keyset pagination` This param can be use with the `limit` param to get the data chunk size',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  startingId?: number;
}
