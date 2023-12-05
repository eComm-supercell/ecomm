import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from '../ability.factory/ability.factory';
import {
  RequiredRule,
  checkAbilityKey,
} from '../decorators/cehckAbility.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: AbilityFactory,
  ) {}
  canActivate(context: ExecutionContext): Promise<boolean> {
    const rules = this.reflector.get<RequiredRule[]>(
      checkAbilityKey,
      context.getHandler(),
    );

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.defineAbility(user);

    rules.forEach((rule) => {
      ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
    });
    return new Promise((resolve) => resolve(true));
  }
}
