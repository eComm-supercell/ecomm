import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FirebaseModule } from '@libs/common/src/firebase/firebase.module';
import { UsersModule as GlobalUsersModule } from '@libs/common/src/users/users.module';
import { UsersService as GlobalUsersService } from '@libs/common/src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AbilityModule } from '@libs/common/src/ability/ability.module';

@Module({
  imports: [FirebaseModule, GlobalUsersModule, AbilityModule],
  controllers: [UsersController],
  providers: [GlobalUsersService, JwtService],
})
export class UsersModule {}
