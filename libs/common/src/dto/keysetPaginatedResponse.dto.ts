import { ApiProperty } from '@nestjs/swagger';

export class KeysetPaginatedResponseDto<TData> {
  @ApiProperty()
  count: number;
  @ApiProperty({
    isArray: true,
    type: 'any',
  })
  results: TData[] | null;
}
