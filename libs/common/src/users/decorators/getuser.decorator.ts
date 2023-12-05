import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (data && user) {
      return user[data];
    }
    return user;
  },
);

/**
 * This decorator is used to get local users frm the request object.
 * Currently used in the auth controller to get the user from the request object for admin accounts only (system accounts) registered using local strategy using username and password.
 *
 */
export const getLocalUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user;
  },
);
