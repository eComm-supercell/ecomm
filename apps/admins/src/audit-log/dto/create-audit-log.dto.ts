import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateAuditLogDto {
  @ApiProperty({
    description: 'Action of the audit log',
    example: 'create',
  })
  @IsString()
  action: string;

  @ApiProperty({
    description: 'Entity of the audit log',
    example: 'user',
  })
  @IsString()
  entity: string;

  @ApiProperty({
    description: 'Entity ID of the audit log',
    example: 1,
  })
  @IsInt()
  entityId: number;

  @ApiProperty({
    description: 'Query of the audit log',
    example: 'query',
  })
  @IsString()
  query: string;

  @ApiProperty({
    description: 'User ID of the audit log',
    example: 1,
  })
  @IsInt()
  userId: number;
}
