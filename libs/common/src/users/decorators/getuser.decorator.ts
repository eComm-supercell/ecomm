import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticationStartegy, Gender, UserType } from '@prisma/client';

export interface SystemUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  emailAddress: string | null;
  verified: boolean;
  firstName: string;
  lastName: string | null;
  gender: Gender;
  profileId: number;
  userType: UserType | null;
  authenticationMethod: AuthenticationStartegy | null;
  identifier: string;
}
/**
 * This decorator is used to get local users frm the request object.
 * Currently used in the auth controller to get the user from the request object for admin accounts only (system accounts) registered using local strategy using username and password.
 *
 */
export const getSystemUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user as SystemUser;
  },
);
