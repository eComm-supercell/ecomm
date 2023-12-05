import { SetMetadata } from '@nestjs/common';
import { Actions, Subjects } from '../ability.factory/ability.factory';

export interface RequiredRule {
  action: Actions;
  subject: Subjects;
}
export const checkAbilityKey = 'check_ability';
export const checkAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(checkAbilityKey, requirements);
