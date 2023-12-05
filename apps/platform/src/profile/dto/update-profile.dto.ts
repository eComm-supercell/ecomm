import { PickType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PickType(CreateProfileDto, [
  'addressId',
  'gender',
  'mobile',
  'dateOfBirth',
] as const) {}
