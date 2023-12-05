import { ApiProperty } from '@nestjs/swagger';
import { SystemConfigEntity } from '../../system-config/entities/system-config.entity';

export class MobileAppConfigEntity {
  @ApiProperty({
    description: 'The id of a mobile app config.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The app config of a mobile app config.',
    example: `{"this": "is JSON"}`,
    format: 'json',
  })
  appConfig: string;

  @ApiProperty({
    description: 'The app version of a mobile app config.',
    example: '1.0.0',
  })
  appVersion: string;

  @ApiProperty({
    description: 'The retail layout of a mobile app config.',
    example: `{"this": "is JSON"}`,
    format: 'json',
  })
  retailLayout: string;

  @ApiProperty({
    description: 'The resturant layout of a mobile app config.',
    example: `{"this": "is JSON"}`,
    format: 'json',
  })
  resturantLayout: string;
  createdAt: string;
  updatedAt: string;
  @ApiProperty({
    description: 'The system config of a mobile app config.',
    type: () => SystemConfigEntity,
  })
  systemConfig: SystemConfigEntity;
}
