import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LocalAuthLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SkimmedProfile {
  @ApiProperty()
  id: number;
  @ApiProperty()
  gender: string;
  @ApiProperty()
  mobile: string;
  @ApiProperty()
  birthDate: Date;
}

export class LocalUser {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  firstName: string;

  @ApiProperty({ type: SkimmedProfile })
  profile: SkimmedProfile;
}
export class LocalAuthResponseDto {
  @ApiProperty({
    description: 'JWT token for authentication',
  })
  token: string;

  @ApiProperty({ type: LocalUser })
  user: LocalUser;
}
