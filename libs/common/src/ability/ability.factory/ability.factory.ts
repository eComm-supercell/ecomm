import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../users/entities/user-login.entity';
import {
  AbilityBuilder,
  MongoAbility,
  createMongoAbility,
} from '@casl/ability';

export type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
export type Subjects = 'User' | UserEntity | 'all';
type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(user: UserEntity) {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );
    if (user.role === 'admin') {
      can('manage', 'User');
    } else {
      can('read', 'all');
      cannot('create', 'User').because('You are not an admin');
    }

    return build();
  }
}
