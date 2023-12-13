import { BaseCustomersAuthResponseDto } from '../base';
import { OmitType } from '@nestjs/swagger';

export class CustomersWEBGoogleOatuhResponseDto extends OmitType(
  BaseCustomersAuthResponseDto,
  ['lastName'] as const,
) {}

export class CustomersOauthResponseDto extends BaseCustomersAuthResponseDto {}
