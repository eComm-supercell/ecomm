import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';

export class UpdateAdminUserDto extends PickType(LocalAuthSignupDto, [
  'firstName',
  'lastName',
] as const) {
  @ApiProperty({
    description: 'The user ID',
    example: 1,
    type: 'number',
    nullable: false,
  })
  @IsNumber()
  id: number;
}
