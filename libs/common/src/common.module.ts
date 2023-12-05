import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { SharedAuthModule } from './auth/sharedAuth.module';
import { AbilityModule } from './ability/ability.module';

@Module({
  imports: [
    FirebaseModule,
    PrismaModule,
    UsersModule,
    SharedAuthModule,
    AbilityModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
