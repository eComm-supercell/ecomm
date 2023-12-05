import { SetMetadata } from '@nestjs/common';
import Role from '@libs/common/src/enums/role.enum';
export const ROLES_KEY = 'roles';
export const ROLES = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
