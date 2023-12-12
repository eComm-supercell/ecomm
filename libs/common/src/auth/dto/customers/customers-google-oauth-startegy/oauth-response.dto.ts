import { BaseCustomersAuthResponseDto } from '../base';
import { OmitType } from '@nestjs/swagger';

export class CustomersGoogleOatuhResponseDto extends OmitType(
  BaseCustomersAuthResponseDto,
  ['lastName'] as const,
) {}
