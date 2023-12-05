import { ApiProperty } from '@nestjs/swagger';

export class UserObject {
  id: number;

  username: string;

  email: string;

  firstName: string;

  lastName: string;

  role: string;

  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'number' },
      dateOfBirth: { type: 'string' },
      mobile: { type: 'string' },
    },
  })
  profile: {
    id: number;
    dateOfBirth: string;
    mobile: string;
  };
}
